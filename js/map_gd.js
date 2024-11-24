// 创建地图实例
const map = new AMap.Map('mapContainer', {
    zoom: 1,
    center: [107.765, 33.074],
    viewMode: '3D', // 开启 3D 视图模式
    features: ['bg', 'building'] //只展示背景、道路及建筑元素

});

// 创建卫星图层
const satelliteLayer = new AMap.TileLayer.Satellite();
satelliteLayer.setMap(map); // 将卫星图层设置为地图的覆盖物


//igs站信息(轨道)
const gd_igsPoints = [
    { name: "AJAC", type: 'IGS站', longitude: 8.762619566, latitude: 41.927460262, altitude: 98.751017, Hardpoint: 'AJAC-H', port: 10415, ip: '223.85.252.56' },
    { name: "AMC4", type: 'IGS站', longitude: -104.524597119, latitude: 38.803123375, altitude: 1911.372586, Hardpoint: 'AMC4-H', port: 10415, ip: '223.85.252.56' },
    { name: "AREG", type: 'IGS站', longitude: -71.492903369, latitude: -16.465422011, altitude: 2489.365560, Hardpoint: 'AREG-H', port: 10415, ip: '223.85.252.56' },
    { name: "ARHT", type: 'IGS站', longitude: 166.663655631, latitude: -77.829437201, altitude: 135.350021, Hardpoint: 'ARHT-H', port: 10415, ip: '223.85.252.56' },
    { name: "ARUC", type: 'IGS站', longitude: 44.085589540, latitude: 40.285715578, altitude: 1222.172303, Hardpoint: 'ARUC-H', port: 10415, ip: '223.85.252.56' },
    { name: "ASCG", type: 'IGS站', longitude: -14.332665039, latitude: -7.916280162, altitude: 37.961080, Hardpoint: 'ASCG-H', port: 10415, ip: '223.85.252.56' },
    { name: "BADG", type: 'IGS站', longitude: 102.234991029, latitude: 51.769704098, altitude: 811.429411, Hardpoint: 'BADG-H', port: 10415, ip: '223.85.252.56' },
    { name: "BOGT", type: 'IGS站', longitude: -74.080939641, latitude: 4.640075496, altitude: 2576.185756, Hardpoint: 'BOGT-H', port: 10415, ip: '223.85.252.56' },
    { name: "BREW", type: 'IGS站', longitude: -119.682637091, latitude: 48.131522186, altitude: 238.603040, Hardpoint: 'BREW-H', port: 10415, ip: '223.85.252.56' },
    { name: "BRST", type: 'IGS站', longitude: -4.496590113, latitude: 48.380496550, altitude: 65.808983, Hardpoint: 'BRST-H', port: 10415, ip: '223.85.252.56' },
    { name: "CHPI", type: 'IGS站', longitude: -44.985159143, latitude: -22.687143537, altitude: 617.437001, Hardpoint: 'CHPI-H', port: 10415, ip: '223.85.252.56' },
    { name: "XCHUR", type: 'IGS站', longitude: -94.088734105, latitude: 58.759077139, altitude: -19.129582, Hardpoint: 'XCHUR-H', port: 10415, ip: '223.85.252.56' },
    { name: "COCO", type: 'IGS站', longitude: 96.833977211, latitude: -12.188337812, altitude: -35.314611, Hardpoint: 'COCO-H', port: 10415, ip: '223.85.252.56' },
    { name: "CPVG", type: 'IGS站', longitude: -22.934930870, latitude: 16.732063845, altitude: 94.056211, Hardpoint: 'CPVG-H', port: 10415, ip: '223.85.252.56' },
    { name: "CRO1", type: 'IGS站', longitude: -64.584317777, latitude: 17.756900482, altitude: -31.964850, Hardpoint: 'CRO1-H', port: 10415, ip: '223.85.252.56' },
    { name: "CUSV", type: 'IGS站', longitude: 100.533924647, latitude: 13.735913362, altitude: 74.233866, Hardpoint: 'CUSV-H', port: 10415, ip: '223.85.252.56' },
    { name: "DGAR", type: 'IGS站', longitude: 72.370247289, latitude: -7.269679458, altitude: -64.926023, Hardpoint: 'DGAR-H', port: 10415, ip: '223.85.252.56' },
    { name: "DJIG", type: 'IGS站', longitude: 42.847068090, latitude: 11.526289584, altitude: 711.393998, Hardpoint: 'DJIG-H', port: 10415, ip: '223.85.252.56' },
    { name: "DUMG", type: 'IGS站', longitude: 140.002188906, latitude: -66.665185765, altitude: -1.646358, Hardpoint: 'DUMG-H', port: 10415, ip: '223.85.252.56' },
    { name: "ENAO", type: 'IGS站', longitude: -28.026010705, latitude: 39.091203467, altitude: 91.540926, Hardpoint: 'ENAO-H', port: 10415, ip: '223.85.252.56' },
    { name: "GANP", type: 'IGS站', longitude: 20.322941187, latitude: 49.034715914, altitude: 746.040440, Hardpoint: 'GANP-H', port: 10415, ip: '223.85.252.56' },
    { name: "GCGO", type: 'IGS站', longitude: -147.499432972, latitude: 64.978056613, altitude: 319.373736, Hardpoint: 'GCGO-H', port: 10415, ip: '223.85.252.56' },
    { name: "HKSL", type: 'IGS站', longitude: 113.927989636, latitude: 22.372002172, altitude: 95.260742, Hardpoint: 'HKSL-H', port: 10415, ip: '223.85.252.56' },
    { name: "HOB2", type: 'IGS站', longitude: 147.438737863, latitude: -42.804702854, altitude: 41.039090, Hardpoint: 'HOB2-H', port: 10415, ip: '223.85.252.56' },
    { name: "XIISC", type: 'IGS站', longitude: 77.570383650, latitude: 13.021172115, altitude: 843.672146, Hardpoint: 'XIISC-H', port: 10415, ip: '223.85.252.56' },
    { name: "JPLM", type: 'IGS站', longitude: -118.173233829, latitude: 34.204822233, altitude: 423.976699, Hardpoint: 'JPLM-H', port: 10415, ip: '223.85.252.56' },
    { name: "KAT1", type: 'IGS站', longitude: 132.153278274, latitude: -14.375992956, altitude: 184.295953, Hardpoint: 'KAT1-H', port: 10415, ip: '223.85.252.56' },
    { name: "KITG", type: 'IGS站', longitude: 66.886740782, latitude: 39.133386659, altitude: 620.636205, Hardpoint: 'KITG-H', port: 10415, ip: '223.85.252.56' },
    { name: "KOUR", type: 'IGS站', longitude: -52.805960427, latitude: 5.252183481, altitude: -25.737737, Hardpoint: 'KOUR-H', port: 10415, ip: '223.85.252.56' },
    { name: "KRGG", type: 'IGS站', longitude: 70.255506538, latitude: -49.351543638, altitude: 72.983534, Hardpoint: 'KRGG-H', port: 10415, ip: '223.85.252.56' },
    { name: "MAS1", type: 'IGS站', longitude: -15.633272383, latitude: 27.763744406, altitude: 197.129776, Hardpoint: 'MAS1-H', port: 10415, ip: '223.85.252.56' },
    { name: "MAW1", type: 'IGS站', longitude: 62.870713627, latitude: -67.604766982, altitude: 59.119139, Hardpoint: 'MAW1-H', port: 10415, ip: '223.85.252.56' },
    { name: "MBAR", type: 'IGS站', longitude: 30.737880216, latitude: -0.601466207, altitude: 1337.528383, Hardpoint: 'MBAR-H', port: 10415, ip: '223.85.252.56' },
    { name: "MDO1", type: 'IGS站', longitude: -104.014995639, latitude: 30.680510137, altitude: 2004.476899, Hardpoint: 'MDO1-H', port: 10415, ip: '223.85.252.56' },
    { name: "MET3", type: 'IGS站', longitude: 24.394503969, latitude: 60.217457003, altitude: 79.234540, Hardpoint: 'MET3-H', port: 10415, ip: '223.85.252.56' },
    { name: "MGUE", type: 'IGS站', longitude: -69.397928850, latitude: -35.777349275, altitude: 1553.722503, Hardpoint: 'MGUE-H', port: 10415, ip: '223.85.252.56' },
    { name: "NIUM", type: 'IGS站', longitude: -169.927076834, latitude: -19.076521759, altitude: 89.700284, Hardpoint: 'NIUM-H', port: 10415, ip: '223.85.252.56' },
    { name: "NKLG", type: 'IGS站', longitude: 9.672128877, latitude: 0.353909896, altitude: 31.503047, Hardpoint: 'NKLG-H', port: 10415, ip: '223.85.252.56' },
    { name: "NLIB", type: 'IGS站', longitude: -91.574899045, latitude: 41.771590788, altitude: 206.977944, Hardpoint: 'NLIB-H', port: 10415, ip: '223.85.252.56' },
    { name: "NNOR", type: 'IGS站', longitude: 116.192725922, latitude: -31.048724978, altitude: 234.801264, Hardpoint: 'NNOR-H', port: 10415, ip: '223.85.252.56' },
    { name: "NYA2", type: 'IGS站', longitude: 11.858641823, latitude: 78.930333518, altitude: 81.568433, Hardpoint: 'NYA2-H', port: 10415, ip: '223.85.252.56' },
    { name: "OUS2", type: 'IGS站', longitude: 170.510924322, latitude: -45.869469019, altitude: 26.089808, Hardpoint: 'OUS2-H', port: 10415, ip: '223.85.252.56' },
    { name: "POL2", type: 'IGS站', longitude: 74.694271662, latitude: 42.679770831, altitude: 1714.212813, Hardpoint: 'POL2-H', port: 10415, ip: '223.85.252.56' },
    { name: "QAQ1", type: 'IGS站', longitude: -46.047768872, latitude: 60.715265830, altitude: 110.502806, Hardpoint: 'QAQ1-H', port: 10415, ip: '223.85.252.56' },
    { name: "REUN", type: 'IGS站', longitude: 55.571723318, latitude: -21.208223615, altitude: 1558.362279, Hardpoint: 'REUN-H', port: 10415, ip: '223.85.252.56' },
    { name: "REYK", type: 'IGS站', longitude: -21.955490507, latitude: 64.138787643, altitude: 93.028212, Hardpoint: 'REYK-H', port: 10415, ip: '223.85.252.56' },
    { name: "RGDG", type: 'IGS站', longitude: -67.751527305, latitude: -53.785837235, altitude: 32.383817, Hardpoint: 'RGDG-H', port: 10415, ip: '223.85.252.56' },
    { name: "SOD3", type: 'IGS站', longitude: 26.389290034, latitude: 67.420788082, altitude: 300.917093, Hardpoint: 'SOD3-H', port: 10415, ip: '223.85.252.56' },
    { name: "SOLO", type: 'IGS站', longitude: 159.954343032, latitude: -9.434910241, altitude: 122.921963, Hardpoint: 'SOLO-H', port: 10415, ip: '223.85.252.56' },
    { name: "STHL", type: 'IGS站', longitude: -5.667342747, latitude: -15.942531668, altitude: 453.174605, Hardpoint: 'STHL-H', port: 10415, ip: '223.85.252.56' },
    { name: "STJ3", type: 'IGS站', longitude: -52.678310339, latitude: 47.595436615, altitude: 154.512400, Hardpoint: 'STJ3-H', port: 10415, ip: '223.85.252.56' },
    { name: "STK2", type: 'IGS站', longitude: 141.844820488, latitude: 43.528641942, altitude: 118.613055, Hardpoint: 'STK2-H', port: 10415, ip: '223.85.252.56' },
    { name: "SUTH", type: 'IGS站', longitude: 20.810466091, latitude: -32.380207177, altitude: 1799.765622, Hardpoint: 'SUTH-H', port: 10415, ip: '223.85.252.56' },
    { name: "XSYOG", type: 'IGS站', longitude: 39.583741593, latitude: -69.006956788, altitude: 49.995172, Hardpoint: 'XSYOG-H', port: 10415, ip: '223.85.252.56' },
    { name: "THU2", type: 'IGS站', longitude: -68.825053867, latitude: 76.537048419, altitude: 36.243764, Hardpoint: 'THU2-H', port: 10415, ip: '223.85.252.56' },
    { name: "TOW2", type: 'IGS站', longitude: 147.055693558, latitude: -19.269270021, altitude: 88.104330, Hardpoint: 'TOW2-H', port: 10415, ip: '223.85.252.56' },
    { name: "ULAB", type: 'IGS站', longitude: 107.052332876, latitude: 47.865066378, altitude: 1575.556862, Hardpoint: 'ULAB-H', port: 10415, ip: '223.85.252.56' },
    { name: "UNB3", type: 'IGS站', longitude: -66.641708812, latitude: 45.950210535, altitude: 22.750321, Hardpoint: 'UNB3-H', port: 10415, ip: '223.85.252.56' },
    { name: "UNSA", type: 'IGS站', longitude: -65.407643061, latitude: -24.727454409, altitude: 1257.796261, Hardpoint: 'UNSA-H', port: 10415, ip: '223.85.252.56' },
    { name: "URUM", type: 'IGS站', longitude: 87.600673653, latitude: 43.807950020, altitude: 858.854571, Hardpoint: 'URUM-H', port: 10415, ip: '223.85.252.56' },
    { name: "USN7", type: 'IGS站', longitude: -77.066278291, latitude: 38.920566443, altitude: 58.916912, Hardpoint: 'USN7-H', port: 10415, ip: '223.85.252.56' },
    { name: "USUD", type: 'IGS站', longitude: 138.362050464, latitude: 36.133110334, altitude: 1508.699782, Hardpoint: 'USUD-H', port: 10415, ip: '223.85.252.56' },
    { name: "WARN", type: 'IGS站', longitude: 12.101430380, latitude: 54.169791056, altitude: 50.741531, Hardpoint: 'WARN-H', port: 10415, ip: '223.85.252.56' },
    { name: "WIND", type: 'IGS站', longitude: 17.089435662, latitude: -22.574916814, altitude: 1734.666608, Hardpoint: 'WIND-H', port: 10415, ip: '223.85.252.56' },
    { name: "WUH2", type: 'IGS站', longitude: 114.357269359, latitude: 30.531678649, altitude: 28.154178, Hardpoint: 'WUH2-H', port: 10415, ip: '223.85.252.56' },
    { name: "YEL2", type: 'IGS站', longitude: -114.480850783, latitude: 62.481319865, altitude: 181.093019, Hardpoint: 'YEL2-H', port: 10415, ip: '223.85.252.56' },
    { name: "XJDPR", type: 'IGS站', longitude: 73.023950034, latitude: 26.206446606, altitude: 169.758620, Hardpoint: 'XJDPR-H', port: 10415, ip: '223.85.252.56' },
    { name: "XKARR", type: 'IGS站', longitude: 117.097198492, latitude: -20.981420053, altitude: 109.134337, Hardpoint: 'XKARR-H', port: 10415, ip: '223.85.252.56' }
];
// 添加标注点
function addMarkers(points, iconUrl) {
    points.forEach(point => {
        const marker = new AMap.Marker({
            position: [point.longitude, point.latitude],
            offset: new AMap.Pixel(-13, -30),
            icon: iconUrl,
        })
        marker.setExtData({ data: point })

        marker.on('click', function (e) {
            console.log(marker)
            const point = e.target.getExtData().data
            new AMap.InfoWindow({
                content: `<div ><strong>点名：${point.name}</strong><br>
                                       类型：${point.type}<br>
                                       经度：${point.longitude.toFixed(3)}°<br>
                                       纬度：${point.latitude.toFixed(3)}°<br>
                                       海拔：${point.altitude.toFixed(3)}m<br></div>`
            }).open(map, marker.getPosition());
        });

        marker.setMap(map);
    });
}

// 添加已知点和控制点标注
addMarkers(gd_igsPoints, 'images/spot-3.png'); // 更改为IGS站图标路径









