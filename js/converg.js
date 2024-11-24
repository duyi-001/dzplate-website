const fs = require('fs');
const path = require('path');
const stream = require('stream');

const inputFilePath = '../data/SSRA00WHU03170.24c';
const orbitOutputFilePath = '../data/result/orbit_result.json';
const clockOutputFilePath = '../data/result/clock_result.json';
const offsetFilePath = '../data/result/offset.txt'; // 用于记录文件指针位置
const lastRunFilePath = '../data/result/last_run.txt'; // 用于记录上次运行时间

let lastOffset = 0;

/**
 * 初始化文件
 */
function initializeFiles() {
    if (!fs.existsSync(path.dirname(offsetFilePath))) {
        fs.mkdirSync(path.dirname(offsetFilePath), { recursive: true });
    }
    if (!fs.existsSync(offsetFilePath)) {
        fs.writeFileSync(offsetFilePath, '0', 'utf-8');
    }
    if (!fs.existsSync(orbitOutputFilePath)) {
        fs.writeFileSync(orbitOutputFilePath, '{}', 'utf-8');
    }
    if (!fs.existsSync(clockOutputFilePath)) {
        fs.writeFileSync(clockOutputFilePath, '{}', 'utf-8');
    }
    if (!fs.existsSync(lastRunFilePath)) {
        fs.writeFileSync(lastRunFilePath, '', 'utf-8');
    }
}

/**
 * 读取文件指针位置
 */
function readOffset() {
    try {
        lastOffset = parseInt(fs.readFileSync(offsetFilePath, 'utf-8').trim(), 10);
    } catch (err) {
        console.error('读取文件指针位置时发生错误:', err.message);
        lastOffset = 0; // 如果文件不存在或读取失败，从头开始
    }
}

/**
 * 写入文件指针位置
 */
function writeOffset(offset) {
    fs.writeFileSync(offsetFilePath, offset.toString(), 'utf-8');
}

/**
 * 记录上次运行时间
 */
function recordLastRunTime() {
    const now = new Date().toISOString();
    fs.writeFileSync(lastRunFilePath, now, 'utf-8');
}

/**
 * 读取上次运行时间
 */
function getLastRunTime() {
    try {
        return fs.readFileSync(lastRunFilePath, 'utf-8').trim();
    } catch (err) {
        return null; // 如果文件不存在或读取失败，返回null
    }
}

/**
 * 增量读取文件内容
 * @returns {Promise<string>} - 新增的文件内容
 */
function readNewContent() {
    return new Promise((resolve, reject) => {
        const chunks = [];
        const fileStream = fs.createReadStream(inputFilePath, { start: lastOffset });

        fileStream.on('data', (chunk) => {
            chunks.push(chunk);
        });

        fileStream.on('end', () => {
            const newData = Buffer.concat(chunks).toString('utf-8');
            lastOffset += newData.length;
            resolve(newData);
        });

        fileStream.on('error', (err) => {
            reject(err);
        });
    });
}

/**
 * 解析新增内容并更新JSON对象
 * @param {string} newContent - 新增的文件内容
 * @param {Object} existingData - 已有的JSON对象
 * @returns {Object} - 更新后的JSON对象
 */
function parseNewContent(newContent, existingData) {
    const lines = newContent.split('\n');
    const result = existingData;
    let timeKey = null;
    let currentType = null;

    const timeRegex = /(\d{4}) (\d{2}) (\d{2}) (\d{2}) (\d{2}) (\d{2})\.(\d+)/;

    lines.forEach((line, index) => {
        line = line.trim();

        if (line.startsWith('> ORBIT') || line.startsWith('> CLOCK')) {
            const isOrbit = line.startsWith('> ORBIT');
            const match = line.match(timeRegex);
            if (match) {
                timeKey = `${match[4]}:${match[5]}:${parseFloat(match[6] + '.' + match[7])}`;
                result[isOrbit ? 'ORBIT' : 'CLOCK'][timeKey] = {
                    BDS: [], GPS: [], GLO: [], Gal: []
                };
                currentType = isOrbit ? 'ORBIT' : 'CLOCK';
            } else {
                console.error(`无法解析${isOrbit ? 'ORBIT' : 'CLOCK'}行: ${line}`);
            }
        } else if (line && timeKey && currentType) {
            const parts = line.split(/\s+/);
            if (parts.length >= 3) {
                let entry = {};

                if (currentType === 'ORBIT' && parts.length >= 5) {
                    const satellite = parts[0];
                    entry = {
                        satellite: satellite,
                        x: parseFloat(parts[2]),
                        y: parseFloat(parts[3]),
                        z: parseFloat(parts[4])
                    };
                } else if (currentType === 'CLOCK') {
                    entry = {
                        satellite: parts[0],
                        value: parseFloat(parts[2])
                    };
                } else {
                    console.warn(`${currentType}数据格式不正确: ${line}`);
                    return;
                }

                const category = getCategory(entry.satellite);
                if (category) {
                    if (category === 'BDS') {
                        // 收集C开头的卫星数据
                        result[currentType][timeKey]['BDS_TEMP'] = (result[currentType][timeKey]['BDS_TEMP'] || []).concat(entry);
                    } else {
                        result[currentType][timeKey][category].push(entry);
                    }
                } else {
                    console.warn(`未知的卫星标识符: ${entry.satellite}`);
                }
            }
        }
    });

    // 对C开头的卫星数据进行排序
    for (const [type, times] of Object.entries(result)) {
        for (const [time, categories] of Object.entries(times)) {
            if (categories['BDS_TEMP']) {
                categories.BDS = categories['BDS_TEMP'].sort((a, b) => a.satellite.localeCompare(b.satellite));
                delete categories['BDS_TEMP'];
            }
        }
    }

    return result;
}

/**
 * 将JSON对象保存到文件
 * @param {Object} data - JSON对象
 * @param {string} outputPath - 输出文件路径
 */
function saveJsonToFile(data, outputPath) {
    const jsonData = JSON.stringify(data, null, 4);
    fs.writeFileSync(outputPath, jsonData, 'utf-8');
}

/**
 * 根据卫星标识符确定类别
 * @param {string} satellite - 卫星标识符
 * @returns {string|null} - 卫星所属的类别，如果未知则返回null
 */
function getCategory(satellite) {
    switch (satellite[0]) {
        case 'C': return 'BDS';
        case 'G': return 'GPS';
        case 'R': return 'GLO';
        case 'E': return 'Gal';
        default: return null;
    }
}

/**
 * 设置定时任务来定期读取并转换文件
 * @param {number} interval - 间隔时间（毫秒）
 */
async function setupScheduledTask(interval) {
    setInterval(async () => {
        console.log('开始读取并转换文件...');

        // 初始化文件
        initializeFiles();

        // 读取文件指针位置
        readOffset();

        // 读取新增内容
        const newContent = await readNewContent();
        if (newContent.trim() === '') {
            console.log('没有新的内容可读取。');
        } else {
            // 读取现有的JSON数据
            let existingData = { ORBIT: {}, CLOCK: {} };
            try {
                existingData.ORBIT = JSON.parse(fs.readFileSync(orbitOutputFilePath, 'utf-8'));
                existingData.CLOCK = JSON.parse(fs.readFileSync(clockOutputFilePath, 'utf-8'));
            } catch (err) {
                console.error('读取现有JSON文件时发生错误:', err.message);
            }

            // 解析新增内容并更新JSON对象
            const updatedData = parseNewContent(newContent, existingData);

            // 保存更新后的JSON数据
            saveJsonToFile(updatedData.ORBIT, orbitOutputFilePath);
            saveJsonToFile(updatedData.CLOCK, clockOutputFilePath);

            // 写入新的文件指针位置
            writeOffset(lastOffset);

            console.log('转换完成！ORBIT数据已保存到', orbitOutputFilePath);
            console.log('CLOCK数据已保存到', clockOutputFilePath);
        }

        // 记录上次运行时间
        recordLastRunTime();
    }, interval);
}

// 设置定时任务，每1分钟执行一次
setupScheduledTask(60 * 1000);

// 使用 fs.createReadStream：通过流式读取文件，减少内存占用和提高读取效率。
// 批处理解析：在读取过程中直接解析数据，减少内存中的数据量。
// 减少 I / O 操作：通过异步读写和批处理，减少对文件的频繁访问。