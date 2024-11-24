// 创建地图实例
const map = new AMap.Map('mapContainer', {
    zoom: 1,
    center: [67.765, 20.074],
    viewMode: '3D', // 开启 3D 视图模式
    features: ['bg', 'building'] //只展示背景、道路及建筑元素

});

// 创建卫星图层
const satelliteLayer = new AMap.TileLayer.Satellite();
satelliteLayer.setMap(map); // 将卫星图层设置为地图的覆盖物


//igs站信息(钟差)
const zc_igsPoints = [
    { name: "ABMF", type: 'IGS站', latitude: 16.2623056, longitude: -61.5275306, altitude: -25, Hardpoint: 'ABMF00GLP0', port: 10415, ip: '223.85.252.56' },
    { name: "ALBH", type: 'IGS站', latitude: 48.3898, longitude: -123.4874, altitude: 32, Hardpoint: 'ALBH00CAN0', port: 10416, ip: '223.85.252.57' },
    { name: "ALGO", type: 'IGS站', latitude: 45.9588, longitude: -78.0714, altitude: 202, Hardpoint: 'ALGO00CAN0', port: 10417, ip: '223.85.252.58' },
    { name: "ALIC", type: 'IGS站', latitude: -23.670125, longitude: 133.8855139, altitude: 603.4, Hardpoint: 'ALIC00AUS0', port: 10418, ip: '223.85.252.59' },
    { name: "ASCG", type: 'IGS站', latitude: -7.916281, longitude: -14.3326645, altitude: 37.953, Hardpoint: 'ASCG00AUS0', port: 10419, ip: '223.85.252.60' },
    { name: "AUCK", type: 'IGS站', latitude: -36.6028, longitude: 174.8344, altitude: 132.711, Hardpoint: 'AUCK00NZL0', port: 10420, ip: '223.85.252.61' },
    { name: "BAIE", type: 'IGS站', latitude: 49.187, longitude: -68.263, altitude: 27.5, Hardpoint: 'BAIE00CAN0', port: 10421, ip: '223.85.252.62' },
    { name: "BAKE", type: 'IGS站', latitude: 64.318, longitude: -96.002, altitude: 4.4, Hardpoint: 'BAKE00CAN0', port: 10422, ip: '223.85.252.63' },
    { name: "BIK0", type: 'IGS站', latitude: 42.8541944, longitude: 74.5331944, altitude: 749.2, Hardpoint: 'BIK000KGZ0', port: 10423, ip: '223.85.252.64' },
    { name: "BRAZ", type: 'IGS站', latitude: -15.9474, longitude: -47.8778, altitude: 1106.0413, Hardpoint: 'BRAZ00BRA0', port: 10424, ip: '223.85.252.65' },
    // { name: "BRUX", type: 'IGS站', latitude: 50.7980639, longitude: 4.3585639, altitude: 158.3, Hardpoint: 'BRUX-H', port: 10425, ip: '223.85.252.66' },
    { name: "BUCU", type: 'IGS站', latitude: 44.4639444, longitude: 26.1257389, altitude: 143.2, Hardpoint: 'BUCU00BRA0', port: 10426, ip: '223.85.252.67' },
    { name: "CEDU", type: 'IGS站', latitude: -31.8666722, longitude: 133.8098278, altitude: 144.8, Hardpoint: 'CEDU00BRA0', port: 10427, ip: '223.85.252.68' },
    // { name: "CEEU", type: 'IGS站', latitude: -12.843694, longitude: 131.132746, altitude: 125.109219, Hardpoint: 'CEEU-H', port: 10428, ip: '223.85.252.69' },
    { name: "CHPG", type: 'IGS站', latitude: -22.6822731, longitude: -22.6822731, altitude: -22.6822731, Hardpoint: 'CHPG00BRA0', port: 10429, ip: '223.85.252.70' },
    { name: "CHTI", type: 'IGS站', latitude: -43.735475, longitude: -176.6171139, altitude: 75.7, Hardpoint: 'CHTI00NZL0', port: 10430, ip: '223.85.252.71' },
    { name: "CHUR", type: 'IGS站', latitude: 58.759, longitude: -94.08, altitude: -18.9, Hardpoint: 'CHUR00CAN0', port: 10431, ip: '223.85.252.72' },
    { name: "COCO", type: 'IGS站', latitude: -12.1883, longitude: 96.8339, altitude: -35.2, Hardpoint: 'COCO00AUS0', port: 10432, ip: '223.85.252.73' },
    // { name: "CTWN", type: 'IGS站', latitude: 36.140352, latitude: 138.352310, altitude: 1628.102067, Hardpoint: 'CTWN-H', port: 10433, ip: '223.85.252.74' },
    { name: "CUT0", type: 'IGS站', latitude: -32.0038889, longitude: 115.8948, altitude: 24, Hardpoint: 'CUT000AUS0', port: 10434, ip: '223.85.252.75' },
    { name: "CUUT", type: 'IGS站', latitude: 13.7359912, longitude: 100.5339348, altitude: 74.296, Hardpoint: 'CUUT00THA0', port: 10435, ip: '223.85.252.76' },
    { name: "CZTG", type: 'IGS站', latitude: -46.4318944, longitude: 51.8554806, altitude: 202.8, Hardpoint: 'CZTG00ATF0', port: 10436, ip: '223.85.252.77' },
    { name: "DAEJ", type: 'IGS站', latitude: 36.3994, longitude: 127.3745, altitude: 117.037, Hardpoint: 'DAEJ00AUS0', port: 10437, ip: '223.85.252.78' },
    { name: "DARW", type: 'IGS站', latitude: -12.8437111, longitude: 131.1327361, altitude: 125.2, Hardpoint: 'DARW00AUS0', port: 10438, ip: '223.85.252.79' },
    { name: "DAV1", type: 'IGS站', latitude: -68.5773, longitude: 77.9726, altitude: 44.5, Hardpoint: 'DAV100AUS0', port: 10439, ip: '223.85.252.80' },
    { name: "DRAO", type: 'IGS站', latitude: 49.3226, longitude: -119.625, altitude: 542, Hardpoint: 'DRAO00CAN0', port: 10440, ip: '223.85.252.81' },
    { name: "DUND", type: 'IGS站', latitude: -45.883675, longitude: 170.597175, altitude: 386.9, Hardpoint: 'DUND00NZL0', port: 10441, ip: '223.85.252.82' },
    { name: "FFMJ", type: 'IGS站', latitude: 50.0905778, longitude: 8.6649639, altitude: 178.2, Hardpoint: 'FFMJ00DEU0', port: 10442, ip: '223.85.252.83' },
    { name: "FRDN", type: 'IGS站', latitude: 45.933, longitude: -66.659, altitude: 95.9, Hardpoint: 'FRDN00CAN0', port: 10443, ip: '223.85.252.84' },
    // { name: "GANP", type: 'IGS站', latitude: 49.0347139, longitude: 20.3229361, altitude: 746, Hardpoint: 'GANP-H', port: 10444, ip: '223.85.252.85' },
    // { name: "GOP6", type: 'IGS站', latitude: 49.9136667, longitude: 14.7856028, altitude: 592.6, Hardpoint: 'GOP6-H', port: 10445, ip: '223.85.252.86' },
    { name: "GRAZ", type: 'IGS站', latitude: 47.0671278, longitude: 15.493475, altitude: 538.3, Hardpoint: 'GRAZ00AUT0', port: 10446, ip: '223.85.252.87' },
    { name: "GRAC", type: 'IGS站', latitude: 43.7544861, longitude: 6.9207611, altitude: 1319.8, Hardpoint: 'GRAC00FRA0', port: 10447, ip: '223.85.252.88' },
    { name: "HERS", type: 'IGS站', latitude: 50.8673, longitude: 0.3362, altitude: 76.5, Hardpoint: 'HERS00GBR0', port: 10448, ip: '223.85.252.89' },
    { name: "HLFX", type: 'IGS站', latitude: 44.684, longitude: -63.611, altitude: 3.1, Hardpoint: 'HLFX00CAN0', port: 10449, ip: '223.85.252.90' },
    { name: "HOB2", type: 'IGS站', latitude: -42.8047194, longitude: 147.4387333, altitude: 41.1, Hardpoint: 'HOB200AUS0H', port: 10450, ip: '223.85.252.91' },
    { name: "HOFN", type: 'IGS站', latitude: 64.2672917, longitude: -15.197925, altitude: 82.3, Hardpoint: 'HOFN00AUS0', port: 10451, ip: '223.85.252.92' },
    // { name: "HUEG", type: 'IGS站', latitude: 47.8339444, longitude: 7.5961667, altitude: 278.4, Hardpoint: 'HUEG-H', port: 10452, ip: '223.85.252.93' },
    // { name: "IFSC", type: 'IGS站', latitude: -26.358900, latitude: 148.144963, altitude: 534.604015, Hardpoint: 'IFSC-H', port: 10453, ip: '223.85.252.94' },
    { name: "IQAL", type: 'IGS站', latitude: 63.756, longitude: -68.510, altitude: 91.7, Hardpoint: 'IQAL00IGS1', port: 10454, ip: '223.85.252.95' },
    { name: "ISTA", type: 'IGS站', latitude: 41.1044472, longitude: 29.0193389, altitude: 147.2, Hardpoint: 'ISTA00TUR0', port: 10455, ip: '223.85.252.96' },
    { name: "JFNG", type: 'IGS站', latitude: 30.5155654, longitude: 114.4910189, altitude: 71.324, Hardpoint: 'JENG00USA0', port: 10456, ip: '223.85.252.97' },
    { name: "JOZ2", type: 'IGS站', latitude: 52.0978306, longitude: 21.0323417, altitude: 152.3, Hardpoint: 'JOZ200USA0', port: 10457, ip: '223.85.252.98' },
    { name: "KARR", type: 'IGS站', latitude: -20.9814361, longitude: 117.0971861, altitude: 109.2, Hardpoint: 'KARR00AUS0', port: 10458, ip: '223.85.252.99' },
    { name: "KAT1", type: 'IGS站', latitude: -14.3760083, longitude: 132.1532694, altitude: 184.5, Hardpoint: 'KAT100AUS0', port: 10459, ip: '223.85.252.100' },
    { name: "KERG", type: 'IGS站', latitude: -49.3514669, longitude: 70.2555239, altitude: 73.009, Hardpoint: 'KERG00ATF0', port: 10460, ip: '223.85.252.101' },
    { name: "KIR8", type: 'IGS站', latitude: 67.8775417, longitude: 21.0601778, altitude: 498, Hardpoint: 'KIR800SWE0', port: 10461, ip: '223.85.252.102' },
    { name: "KRGG", type: 'IGS站', latitude: -49.351543, longitude: 70.2555059, altitude: 72.9673, Hardpoint: 'KRGG00ATF0', port: 10462, ip: '223.85.252.103' },
    { name: "LAUT", type: 'IGS站', latitude: -17.6088056, longitude: 177.4465833, altitude: 89.7, Hardpoint: 'LAUT00FJI0', port: 10463, ip: '223.85.252.104' },
    // { name: "LEIJ", type: 'IGS站', latitude: 51.3539806, longitude: 12.3740972, altitude: 178.4, Hardpoint: 'LEIJ-H', port: 10464, ip: '223.85.252.105' },
    { name: "LHAZ", type: 'IGS站', latitude: 29.6573306, longitude: 91.1040222, altitude: 3622, Hardpoint: 'LHAZ00ESP0', port: 10465, ip: '223.85.252.106' },
    { name: "LPAL", type: 'IGS站', latitude: 28.764, longitude: -17.894, altitude: 2207, Hardpoint: 'LPAL00ESP0', port: 10466, ip: '223.85.252.107' },
    { name: "MAC1", type: 'IGS站', latitude: -54.4995, longitude: 158.9358, altitude: -6.7, Hardpoint: 'MAC100ESP0', port: 10467, ip: '223.85.252.108' },
    // { name: "MAO0", type: 'IGS站', latitude: -16.465422, latitude: -71.492903, altitude: 2489.362279, Hardpoint: 'MAO0-H', port: 10468, ip: '223.85.252.109' },
    { name: "MAR6", type: 'IGS站', latitude: 60.5951417, longitude: 17.2585222, altitude: 75.4, Hardpoint: 'MAR600SWE0', port: 10468, ip: '223.85.252.109' },
    { name: "MAR7", type: 'IGS站', latitude: 60.5950528, longitude: 17.2584389, altitude: 74.3, Hardpoint: 'MAR700SWE0', port: 10469, ip: '223.85.252.110' },
    // { name: "MARS", type: 'IGS站', latitude: 43.2787694, longitude: 5.3537833, altitude: 61.7, Hardpoint: 'MARS-H', port: 10470, ip: '223.85.252.111' },
    { name: "MATE", type: 'IGS站', latitude: 40.6491306, longitude: 16.7044583, altitude: 535.6, Hardpoint: 'MATE00ITA0', port: 10471, ip: '223.85.252.112' },
    { name: "MAW1", type: 'IGS站', latitude: -67.6048, longitude: 62.8707, altitude: 59.2, Hardpoint: 'MAW100ATA0', port: 10472, ip: '223.85.252.113' },
    { name: "MAYG", type: 'IGS站', latitude: -12.7820532, longitude: 45.2581519, altitude: -16.35, Hardpoint: 'MAYG00MYT0', port: 10473, ip: '223.85.252.114' },
    { name: "MCHL", type: 'IGS站', latitude: -26.3589056, longitude: 148.1449611, altitude: 534.6, Hardpoint: 'MCHI00USA0', port: 10474, ip: '223.85.252.115' },
    { name: "MELI", type: 'IGS站', latitude: 28.4816661, longitude: -16.3207178, altitude: 622.82, Hardpoint: 'MELI00ESP0', port: 10475, ip: '223.85.252.116' },
    { name: "MET3", type: 'IGS站', latitude: 60.2174556, longitude: 24.3945, altitude: 79.2, Hardpoint: 'MET300FIN0', port: 10476, ip: '223.85.252.117' },
    { name: "METG", type: 'IGS站', latitude: 60.2419667, longitude: 24.384175, altitude: 59.7, Hardpoint: 'METG00ARG0', port: 10477, ip: '223.85.252.118' },
    { name: "MIZU", type: 'IGS站', latitude: 39.1351694, longitude: 141.1328278, altitude: 117, Hardpoint: 'MIZU00USA0', port: 10478, ip: '223.85.252.119' },
    { name: "MOBS", type: 'IGS站', latitude: -37.8294054, longitude: 144.9753402, altitude: 40.578, Hardpoint: 'MOBS00AUS0', port: 10479, ip: '223.85.252.120' },
    { name: "MQZG", type: 'IGS站', latitude: -43.7027361, longitude: 172.654705, altitude: 154.68, Hardpoint: 'MQZG00NZL0', port: 10480, ip: '223.85.252.121' },
    { name: "MRO1", type: 'IGS站', latitude: -26.6966389, longitude: 116.6374917, altitude: 354.1, Hardpoint: 'MRO100AUS0', port: 10481, ip: '223.85.252.122' },
    { name: "NICO", type: 'IGS站', latitude: 35.1409806, longitude: 33.3964333, altitude: 191.7, Hardpoint: 'NICO00CYP0', port: 10482, ip: '223.85.252.123' },
    // { name: "NRC10", type: 'IGS站', latitude: 45.4542, longitude: -75.6238, altitude: 82.5, Hardpoint: 'NRC10-H', port: 10483, ip: '223.85.252.124' },
    // { name: "OBE4", type: 'IGS站', latitude: 48.0848056, longitude: 11.2778556, altitude: 650.5, Hardpoint: 'OBE4-H', port: 10484, ip: '223.85.252.125' },
    { name: "OHI3", type: 'IGS站', latitude: -63.3210947, longitude: -57.9013853, altitude: 32.15, Hardpoint: 'OHI300ATA0', port: 10485, ip: '223.85.252.126' },
    // { name: "ONRJ", type: 'IGS站', latitude: 35.625448, latitude: 117.592223, altitude: 268.798524, Hardpoint: 'ONRJ-H', port: 10486, ip: '223.85.252.127' },
    { name: "ONS1", type: 'IGS站', latitude: 57.3953306, longitude: 11.9245361, altitude: 44.4, Hardpoint: 'ONS100SWE0', port: 10487, ip: '223.85.252.128' },
    { name: "ONSA", type: 'IGS站', latitude: 57.3952972, longitude: 11.9255139, altitude: 45.5, Hardpoint: 'ONSA00SWE0', port: 10488, ip: '223.85.252.129' },
    // { name: "ORID", type: 'IGS站', latitude: 41.127, longitude: 20.794, altitude: 773, Hardpoint: 'ORID-H', port: 10489, ip: '223.85.252.130' },
    // { name: "SSRA", type: 'IGS站', latitude: 39.858210, longitude: 67.904611, altitude: 529.905736, Hardpoint: 'SSRA-H', port: 10490, ip: '223.85.252.131' }
];

// 默认数据
const defaultPoint = {
    name: "NICO",
    Hardpoint: 'NICO00CYP0',
    port: 10482,
    ip: '223.85.252.131',
    totalTime: '16:33:07'
};

// 设置默认值
function setDefaultValues(point) {
    setElementValue('stationName', point.name);
    setElementValue('ip', point.ip);
    setElementValue('port', point.port);
    setElementValue('Hardpoint', point.Hardpoint);
    setElementValue('totalTime', point.totalTime);
}

// 设置元素值的辅助函数
function setElementValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.value = value || '';
    }
}

// 页面加载完成后设置默认值
document.addEventListener('DOMContentLoaded', function () {
    setDefaultValues(defaultPoint);
});


// 添加标注点
function addMarkers(points, iconUrl) {
    points.forEach(point => {
        const marker = new AMap.Marker({
            position: [point.longitude, point.latitude],
            offset: new AMap.Pixel(-13, -30),
            icon: iconUrl,
        });
        marker.setExtData({ data: point });
        marker.on('click', function (e) {
            const point = e.target.getExtData().data;

            // 检查并设置元素值
            function setElementValue(id, value) {
                const element = document.getElementById(id);
                if (element) {
                    element.value = value || '';
                }
            }

            // 设置其他字段
            setElementValue('stationName', point.name);
            setElementValue('Hardpoint', point.Hardpoint);
            setElementValue('port', point.port);
            setElementValue('ip', point.ip);
            setElementValue('antenna', point.antenna);

            // 生成随机总时间，确保时间大于5小时
            if (!point.totalTime) {
                const h = 5 + getRandomInt(0, 18); // 最小5小时，最大23小时
                const m = getRandomInt(0, 59);
                const s = getRandomInt(0, 59);
                point.totalTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            }

            // 显示信息窗口
            const infoWindow = new AMap.InfoWindow({
                content: `<div><strong>点名：${point.name}</strong><br>
                  类型：${point.type}<br>
                  经度：${point.longitude.toFixed(3)}°<br>
                  纬度：${point.latitude.toFixed(3)}°<br>
                  海拔：${point.altitude.toFixed(3)}m<br></div>`
            });

            infoWindow.open(map, marker.getPosition());

            // 更新总时间
            let totalTime = point.totalTime;
            const updateTime = () => {
                let [h, m, s] = totalTime.split(':').map(Number);
                s += 1; // 每秒增加
                if (s >= 60) { m++; s -= 60; }
                if (m >= 60) { h++; m -= 60; }
                if (h >= 24) { h -= 24; } // 24小时制
                totalTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

                // 更新HTML元素中的总时间
                setElementValue('totalTime', totalTime);
            };

            // 每秒更新一次时间
            const intervalId = setInterval(updateTime, 1000);

            // 当信息窗口关闭时清除计时器
            infoWindow.on('close', () => {
                clearInterval(intervalId);
            });
        });
        marker.setMap(map);
    });
}

// 辅助函数：生成指定范围内的随机整数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// 添加已知点和控制点标注
addMarkers(zc_igsPoints, 'images/spot-3.png'); // 更改为IGS站图标路径









