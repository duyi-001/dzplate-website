const fs = require('fs');

// 定义文件路径（已按正确顺序排列）
const filePaths = [
    '../data/NRTK_20241111_SSRC00WHU0_S_GEC.upd',
    '../data/NRTK_20241112_SSRC00WHU0_S_GEC.upd',
    '../data/NRTK_20241113_SSRC00WHU0_S_GEC.upd'
];
const wideFilePath = '../data/updresult/widelane.json';
const narrowFilePath = '../data/updresult/narrowlane.json';

// 初始化存储数据的结构
let wideData = {};
let narrowData = {};

// 递归函数，用于依次处理文件
function processFiles(index) {
    if (index >= filePaths.length) {
        // 所有文件处理完毕，写入文件
        fs.writeFileSync(wideFilePath, JSON.stringify(wideData, null, 2));
        fs.writeFileSync(narrowFilePath, JSON.stringify(narrowData, null, 2));
        console.log(`Files have been saved to ${wideFilePath} and ${narrowFilePath}`);
        return;
    }

    const filePath = filePaths[index];

    // 读取文件
    fs.readFile(filePath, 'utf8', (err, dataFile) => {
        if (err) throw err;

        // 按行分割内容
        const lines = dataFile.split('\n');

        // 初始化日期和时间
        let currentDate = '';
        let currentTime = '';

        // 遍历每一行
        for (let line of lines) {
            // 去除行首尾空格
            line = line.trim();

            // 处理注释行，获取日期和时间
            if (line.startsWith('*')) {
                const dateParts = line.split(/\s+/).slice(1, 7);
                const [year, month, day, hour, minute, second] = dateParts.map((part, index) =>
                    index < 3 ? parseInt(part, 10) : parseFloat(part)
                );
                currentDate = `${year}-${padZero(month)}-${padZero(day)}`;
                currentTime = `${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;
                continue;
            }

            // 跳过空行
            if (!line) continue;

            // 分割行内容
            const parts = line.split(/\s+/);
            const [satellite, wideValue, , , , , , narrowValue] = parts;

            // 获取卫星系统
            const system = getSystemFromSatellite(satellite);

            // 构建宽值数据条目
            if (!wideData[currentDate]) wideData[currentDate] = {};
            if (!wideData[currentDate][currentTime]) wideData[currentDate][currentTime] = { GPS: [], BDS: [], Gal: [] };
            wideData[currentDate][currentTime][system].push({
                satellite: satellite,
                value: parseFloat(wideValue)
            });

            // 构建窄值数据条目
            if (!narrowData[currentDate]) narrowData[currentDate] = {};
            if (!narrowData[currentDate][currentTime]) narrowData[currentDate][currentTime] = { GPS: [], BDS: [], Gal: [] };
            narrowData[currentDate][currentTime][system].push({
                satellite: satellite,
                value: parseFloat(narrowValue)
            });
        }

        // 处理下一个文件
        processFiles(index + 1);
    });
}

// 开始处理文件
processFiles(0);

function padZero(value) {
    return value < 10 ? `0${value}` : value.toString();
}

function getSystemFromSatellite(satellite) {
    if (satellite.startsWith('G')) return 'GPS';
    else if (satellite.startsWith('C')) return 'BDS';
    else if (satellite.startsWith('E')) return 'Gal';
    else return ''; // 未知卫星
}