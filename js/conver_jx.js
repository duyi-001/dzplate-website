const fs = require('fs');

// 配置项
const logFilePath = '../data/PostBaselineSols_2024_319.log_Coor';
const outputFilePath = '../data/jxresult/jx_data.json';

// 读取日志文件
const logContent = fs.readFileSync(logFilePath, 'utf-8');

// 定义更灵活的正则表达式来匹配每条记录
const recordPattern = /DeviceName \w+ staName: (\w+) iStatus: \d+ bSended: \d+ quality:\s*(\d+)  time (\d+) (\d+) ([A-Z]) SDhAccChange\s+([-.\d]+)\s+([-.\d]+)\s+([-.\d]+)/g;

// 解析日志内容并提取所需信息
const records = [];
let match;
while ((match = recordPattern.exec(logContent)) !== null) {
    const record = {
        staName: match[1],
        quality: parseInt(match[2], 10),
        year: match[3],
        day: match[4],
        type: match[5],
        SDhAccChange: {
            b: parseFloat(match[6]),
            l: parseFloat(match[7]),
            h: parseFloat(match[8])
        }
    };
    records.push(record);
}

// 按 time 后的 " 2024 319" 和 "A" 分组
const groupedRecords = {};
records.forEach(record => {
    const yearDayKey = `${record.year} ${record.day}`;
    const typeKey = record.type;

    if (!groupedRecords[yearDayKey]) {
        groupedRecords[yearDayKey] = {};
    }

    if (!groupedRecords[yearDayKey][typeKey]) {
        groupedRecords[yearDayKey][typeKey] = [];
    }

    groupedRecords[yearDayKey][typeKey].push({
        staName: record.staName,
        quality: record.quality,
        SDhAccChange: record.SDhAccChange
    });
});

// 按 staName 后两位数字排序
for (const yearDayKey in groupedRecords) {
    for (const typeKey in groupedRecords[yearDayKey]) {
        groupedRecords[yearDayKey][typeKey].sort((a, b) => {
            const numA = parseInt(a.staName.slice(-2), 10);
            const numB = parseInt(b.staName.slice(-2), 10);
            return numA - numB;
        });
    }
}

// 将结果写入到指定的JSON文件中
fs.writeFileSync(outputFilePath, JSON.stringify(groupedRecords, null, 2));

console.log(`Grouped and sorted data has been written to ${outputFilePath}`);