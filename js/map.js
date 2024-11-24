// 创建地图实例
const map = new AMap.Map('mapContainer', {
  zoom: 9,
  center: [102.765, 30.074],
  viewMode: '3D', // 开启 3D 视图模式
  features: ['bg', 'building'] //只展示背景及建筑元素

});

// 创建卫星图层
const satelliteLayer = new AMap.TileLayer.Satellite();
satelliteLayer.setMap(map); // 将卫星图层设置为地图的覆盖物

//监测站信息
const try1point = [
  { name: "D102", type: '监测站', longitude: 98.69703443, latitude: 31.08263645, altitude: 3693.84668, Hardpoint: 'D102', port: 9401, ip: '124.205.216.26' },
  { name: "D103", type: '监测站', longitude: 98.69757183, latitude: 31.08266523, altitude: 3672.057373, Hardpoint: 'D103', port: 9401, ip: '124.205.216.26' },
  { name: "D104", type: '监测站', longitude: 98.69790444, latitude: 31.0822501, altitude: 3664.946045, Hardpoint: 'D104', port: 9401, ip: '124.205.216.26' },
  { name: "D105", type: '监测站', longitude: 98.69787672, latitude: 31.07876722, altitude: 3726.637695, Hardpoint: 'D105', port: 9401, ip: '124.205.216.26' },
  { name: "D106", type: '监测站', longitude: 98.69953967, latitude: 31.07960322, altitude: 3630.486084, Hardpoint: 'D106', port: 9401, ip: '124.205.216.26' },
  { name: "D107", type: '监测站', longitude: 98.70003427, latitude: 31.07966738, altitude: 3603.271973, Hardpoint: 'D107', port: 9401, ip: '124.205.216.26' },
  { name: "D108", type: '监测站', longitude: 98.70001154, latitude: 31.07983056, altitude: 3563.596924, Hardpoint: 'D108', port: 9401, ip: '124.205.216.26' },
  { name: "D109", type: '监测站', longitude: 98.69874441, latitude: 31.07964949, altitude: 3628.313721, Hardpoint: 'D109', port: 9401, ip: '124.205.216.26' },
  { name: "D110", type: '监测站', longitude: 98.70225216, latitude: 31.08562574, altitude: 3422.567871, Hardpoint: 'D110', port: 9401, ip: '124.205.216.26' },
  { name: "D111", type: '监测站', longitude: 98.69832924, latitude: 31.0800738, altitude: 3646.372803, Hardpoint: 'D111', port: 9401, ip: '124.205.216.26' },
  { name: "D112", type: '监测站', longitude: 98.69784471, latitude: 31.08009169, altitude: 3657.555176, Hardpoint: 'D112', port: 9401, ip: '124.205.216.26' },
  { name: "D113", type: '监测站', longitude: 98.69846205, latitude: 31.0852308, altitude: 3651.743408, Hardpoint: 'D113', port: 9401, ip: '124.205.216.26' },
  { name: "D114", type: '监测站', longitude: 98.69723448, latitude: 31.07999432, altitude: 3674.791504, Hardpoint: 'D114', port: 9401, ip: '124.205.216.26' },
  { name: "D115", type: '监测站', longitude: 98.69957304, latitude: 31.07988034, altitude: 3582.571533, Hardpoint: 'D115', port: 9401, ip: '124.205.216.26' },
  { name: "D116", type: '监测站', longitude: 98.69787613, latitude: 31.07876774, altitude: 3691.064697, Hardpoint: 'D116', port: 9401, ip: '124.205.216.26' },
  { name: "D202", type: '监测站', longitude: 102.7391382, latitude: 29.29503475, altitude: 814.9655151, Hardpoint: 'D202', port: 9401, ip: '124.205.216.26' },
  { name: "D203", type: '监测站', longitude: 102.7386021, latitude: 29.29454337, altitude: 826.0765991, Hardpoint: 'D203', port: 9401, ip: '124.205.216.26' },
  { name: "D204", type: '监测站', longitude: 102.7389477, latitude: 29.29213195, altitude: 914.0272827, Hardpoint: 'D204', port: 9401, ip: '124.205.216.26' },
  { name: "D205", type: '监测站', longitude: 102.7389465, latitude: 29.29268498, altitude: 916.7609863, Hardpoint: 'D205', port: 9401, ip: '124.205.216.26' },
  { name: "D206", type: '监测站', longitude: 102.7385705, latitude: 29.29374753, altitude: 861.1852417, Hardpoint: 'D206', port: 9401, ip: '124.205.216.26' },
  { name: "D302", type: '监测站', longitude: 102.161907, latitude: 29.47617817, altitude: 1402.257202, Hardpoint: 'D302', port: 9401, ip: '124.205.216.26' },
  { name: "D302", type: '监测站', longitude: 102.161907, latitude: 29.48117817, altitude: 1402.257202, Hardpoint: 'D302', port: 9401, ip: '124.205.216.26' },
  { name: "D303", type: '监测站', longitude: 102.1631585, latitude: 29.47998653, altitude: 1377.384033, Hardpoint: 'D303', port: 9401, ip: '124.205.216.26' },
  { name: "D304", type: '监测站', longitude: 102.163966, latitude: 29.47966542, altitude: 1331.231445, Hardpoint: 'D304', port: 9401, ip: '124.205.216.26' },
  { name: "D402", type: '监测站', longitude: 102.7217979, latitude: 30.44773947, altitude: 1325.820313, Hardpoint: 'D402', port: 9401, ip: '124.205.216.26' },
  { name: "D403", type: '监测站', longitude: 102.7235063, latitude: 30.45240368, altitude: 1154.561279, Hardpoint: 'D403', port: 9401, ip: '124.205.216.26' },
  { name: "D404", type: '监测站', longitude: 102.7200591, latitude: 30.4492535, altitude: 1318.52417, Hardpoint: 'D404', port: 9401, ip: '124.205.216.26' },
  { name: "D405", type: '监测站', longitude: 102.7242433, latitude: 30.45085264, altitude: 1184.927246, Hardpoint: 'D405', port: 9401, ip: '124.205.216.26' },
  { name: "D406", type: '监测站', longitude: 102.7152217, latitude: 30.44819509, altitude: 1565.130249, Hardpoint: 'D406', port: 9401, ip: '124.205.216.26' },
  { name: "D502", type: '监测站', longitude: 103.0148933, latitude: 30.07178572, altitude: 756.4879761, Hardpoint: 'D502', port: 9401, ip: '124.205.216.26' },
  { name: "D503", type: '监测站', longitude: 103.0156692, latitude: 30.07046263, altitude: 785.7763672, Hardpoint: 'D503', port: 9401, ip: '124.205.216.26' },
  { name: "D504", type: '监测站', longitude: 103.0189537, latitude: 30.0693063, altitude: 899.693, Hardpoint: 'D504', port: 9401, ip: '124.205.216.26' },
  { name: "D505", type: '监测站', longitude: 103.0130682, latitude: 30.0756166, altitude: 784.296, Hardpoint: 'D505', port: 9401, ip: '124.205.216.26' },
  { name: "D506", type: '监测站', longitude: 103.0149051, latitude: 30.07165236, altitude: 753.3808594, Hardpoint: 'D506', port: 9401, ip: '124.205.216.26' },
  { name: "D507", type: '监测站', longitude: 103.0156506, latitude: 30.07033597, altitude: 782.659729, Hardpoint: 'D507', port: 9401, ip: '124.205.216.26' },
  { name: "D508", type: '监测站', longitude: 103.0189199, latitude: 30.06927216, altitude: 889.8216553, Hardpoint: 'D508', port: 9401, ip: '124.205.216.26' },
  { name: "D602", type: '监测站', longitude: 102.6976698, latitude: 30.4877673, altitude: 1554.322388, Hardpoint: 'D602', port: 9401, ip: '124.205.216.26' },
  { name: "D603", type: '监测站', longitude: 102.7026493, latitude: 30.48779788, altitude: 1391.237915, Hardpoint: 'D603', port: 9401, ip: '124.205.216.26' },
  { name: "D604", type: '监测站', longitude: 102.7063099, latitude: 30.48733159, altitude: 1251.281982, Hardpoint: 'D604', port: 9401, ip: '124.205.216.26' },
  { name: "D605", type: '监测站', longitude: 102.7052507, latitude: 30.4833442, altitude: 1206.866699, Hardpoint: 'D605', port: 9401, ip: '124.205.216.26' },
  { name: "D606", type: '监测站', longitude: 102.70357, latitude: 30.49105609, altitude: 1359.731689, Hardpoint: 'D606', port: 9401, ip: '124.205.216.26' },
  { name: "D607", type: '监测站', longitude: 102.7057775, latitude: 30.49564721, altitude: 1278.161987, Hardpoint: 'D607', port: 9401, ip: '124.205.216.26' },
  { name: "D702", type: '监测站', longitude: 102.5514958, latitude: 29.59859165, altitude: 1621.523926, Hardpoint: 'D702', port: 9401, ip: '124.205.216.26' },
  { name: "D703", type: '监测站', longitude: 102.549913, latitude: 29.6013782, altitude: 1800.448, Hardpoint: 'D703', port: 9401, ip: '124.205.216.26' },
  { name: "D704", type: '监测站', longitude: 102.5527062, latitude: 29.59917085, altitude: 1632.371826, Hardpoint: 'D704', port: 9401, ip: '124.205.216.26' },
  { name: "D705", type: '监测站', longitude: 102.5454794, latitude: 29.60742348, altitude: 1848.317139, Hardpoint: 'D705', port: 9401, ip: '124.205.216.26' },
  { name: "D706", type: '监测站', longitude: 102.5437984, latitude: 29.60644903, altitude: 1750.862793, Hardpoint: 'D706', port: 9401, ip: '124.205.216.26' },
  { name: "D707", type: '监测站', longitude: 102.5425991, latitude: 29.60592848, altitude: 1707.886963, Hardpoint: 'D707', port: 9401, ip: '124.205.216.26' },
  { name: "D708", type: '监测站', longitude: 102.5409722, latitude: 29.60585955, altitude: 1631.964966, Hardpoint: 'D708', port: 9401, ip: '124.205.216.26' }
];

//基准站信息
const trypoint = [
  { name: "D101(网格1)", type: '基准站', longitude: 98.69905019, latitude: 31.07705595, altitude: 3761.52832, Hardpoint: 'D101', port: 9401, ip: '124.205.216.26' },
  { name: "D201(网格2)", type: '基准站', longitude: 102.7465837, latitude: 29.2957355, altitude: 891.507019, Hardpoint: 'D201', port: 9401, ip: '124.205.216.26' },
  { name: "D301(网格3)", type: '基准站', longitude: 102.1594156, latitude: 29.48729358, altitude: 1809.292969, Hardpoint: 'D301', port: 9401, ip: '124.205.216.26' },
  { name: "D401(网格4)", type: '基准站', longitude: 102.7223326, latitude: 30.44554095, altitude: 1364.426025, Hardpoint: 'D401', port: 9401, ip: '124.205.216.26' },
  { name: "D501(网格5)", type: '基准站', longitude: 103.0119458, latitude: 30.06050741, altitude: 733.24762, Hardpoint: 'D501', port: 9401, ip: '124.205.216.26' },
  { name: "D601(网格6)", type: '基准站', longitude: 102.7106437, latitude: 30.49052648, altitude: 1329.477661, Hardpoint: 'D601', port: 9401, ip: '124.205.216.26' },
  { name: "D701(网格7)", type: '基准站', longitude: 102.549913, latitude: 29.60137823, altitude: 1800.447754, Hardpoint: 'D701', port: 9401, ip: '124.205.216.26' }
];
// cors站点数据
const corsPoints = [
  { name: "BAOX", type: "cors站", longitude: 102.823369242, latitude: 30.247992642, altitude: 752.328, antenna: "TRM57971.00", port: 10291, ip: "127.16.34.9", Hardpoint: "BAOX" },
  { name: "DANL", type: "cors站", longitude: 103.488999592, latitude: 30.066817694, altitude: 552.1669, antenna: "TRM57971.00", port: 10169, ip: "127.16.34.9", Hardpoint: "DANL" },
  { name: "HANY", type: "cors站", longitude: 102.570051000, latitude: 29.360491874, altitude: 1565.154, antenna: "TRM57971.00", port: 10111, ip: "127.16.34.9", Hardpoint: "HANY" },
  { name: "HOYA", type: "cors站", longitude: 103.374907320, latitude: 29.893299602, altitude: 554.8159, antenna: "HXCCGX601A", port: 11066, ip: "127.16.34.9", Hardpoint: "HOYA" },
  { name: "LUDI", type: "cors站", longitude: 102.246755780, latitude: 29.904741015, altitude: 1584.676, antenna: "HITAT45101CP", port: 11070, ip: "127.16.34.9", Hardpoint: "LUDI" },
  { name: "MINS", type: "cors站", longitude: 103.083715714, latitude: 30.051011728, altitude: 654.5296, antenna: "TRM57971.00", port: 10129, ip: "127.16.34.9", Hardpoint: "MINS" },
  { name: "NBSH", type: "cors站", longitude: 103.267803342, latitude: 30.408213595, altitude: 1555.471, antenna: "HITAT45101CP", port: 11013, ip: "127.16.34.9", Hardpoint: "NBSH" },
  { name: "PUJI", type: "cors站", longitude: 103.488768925, latitude: 30.201215669, altitude: 558.2615, antenna: "HITAT45101CP", port: 11075, ip: "127.16.34.9", Hardpoint: "PUJI" },
  { name: "QAQI", type: "cors站", longitude: 102.764491700, latitude: 30.755471431, altitude: 2508.83, antenna: "HXCCGX601A", port: 11055, ip: "127.16.34.9", Hardpoint: "QAQI" },
  { name: "QLAI", type: "cors站", longitude: 103.449252172, latitude: 30.431175539, altitude: 454.5615, antenna: "TRM59900.00", port: 10331, ip: "127.16.34.9", Hardpoint: "QLAI" },
  { name: "TIAQ", type: "cors站", longitude: 102.763995389, latitude: 30.074583769, altitude: 753.765, antenna: "TRM59900.00", port: 10608, ip: "127.16.34.9", Hardpoint: "TIAQ" },
  { name: "WAWS", type: "cors站", longitude: 103.038700586, latitude: 29.576714123, altitude: 1579.425, antenna: "HXCCGX601A", port: 11049, ip: "127.16.34.9", Hardpoint: "WAWS" },
  { name: "YINJ", type: "cors站", longitude: 102.760572356, latitude: 29.764649397, altitude: 753.8143, antenna: "TRM57971.00", port: 10324, ip: "127.16.34.9", Hardpoint: "YINJ" }
];

// 默认数据
const defaultPoint = {
  name: "D202",
  Hardpoint: 'D202',
  port: 9401,
  ip: '124.205.216.26',
  totalTime: '12:23:47'
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

// 绘制Delaunay三角网
function drawDelaunay(points) {
  const coordinates = points.map(p => [p.longitude, p.latitude]);
  const delaunay = d3.Delaunay.from(coordinates);
  const triangles = delaunay.triangles;
  for (let i = 0; i < triangles.length; i += 3) {
    const p1 = points[triangles[i]];
    const p2 = points[triangles[i + 1]];
    const p3 = points[triangles[i + 2]];
    const path = new AMap.Polyline({
      path: [
        [p1.longitude, p1.latitude],
        [p2.longitude, p2.latitude],
        [p3.longitude, p3.latitude],
        [p1.longitude, p1.latitude] // 闭合路径
      ],
      strokeColor: "#50a7da",
      strokeOpacity: 0.8,
      strokeWeight: 2
    });

    path.setMap(map);
  }
}


// 添加已知点和控制点标注
addMarkers(try1point, 'images/spot-1.png'); // 更改为监测站图标路径
addMarkers(trypoint, 'images/spot-2.png'); // 更改为基准站图标路径
addMarkers(corsPoints, 'images/spot-3.png'); // 更改为CORS站图标路径

// 调用函数创建三角网
drawDelaunay(corsPoints)


// 生成随机整数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}








