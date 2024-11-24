(function () {
    // 声明数据
    var downloadedData = 40; // 默认下载的数据
    const totalData = 125;   // 总数据

    // 实例化对象
    var myChart = echarts.init(document.getElementById('chart1-1'));

    // 指定配置项和数据
    function updateChart() {
        // 计算已下载数据与总数据之比
        var percentage = Math.floor((downloadedData / totalData) * 100);

        // 更新图表的配置项
        var option = {
            color: ['#006cff', '#60cda0'],
            tooltip: {
                trigger: 'item'
            },
            legend: {
                bottom: "5%",
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    color: '#ffffff',
                    fontSize: "12"
                }
            },
            series: [{
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'inside'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold',
                        color: '#ffffff'
                    }
                },
                data: [
                    { value: downloadedData, name: '已下载' },
                    { value: totalData - downloadedData, name: '未下载' }
                ]
            }],
            graphic: [{
                type: 'text',
                left: 'center',
                top: 'center',
                style: {
                    text: percentage + '%',
                    font: '34px Microsoft YaHei',
                    fill: '#ffffff'
                }
            }]
        };

        // 设置新的配置项
        myChart.setOption(option);
    }

    // 初始加载图表
    updateChart();

    // 获取当前的北京时间（单位：小时和分钟）
    function getCurrentTime() {
        var now = new Date();
        var hours = now.getUTCHours() + 8; // 北京时间 = UTC + 8小时
        var minutes = now.getUTCMinutes();
        return { hours, minutes };
    }

    // 定时更新函数
    function startUpdating() {
        // 启动定时器，每5秒更新一次数据
        setInterval(() => {
            // 随机增加 downloadedData 的值（增值 0-9）
            downloadedData += Math.floor(Math.random() * 10);

            // 如果 downloadedData 达到或超过 120，则重置为 40
            if (downloadedData >= 120) {
                downloadedData = 40;
            }

            // 更新图表
            updateChart();
        }, 5000); // 每 5 秒更新一次
    }

    // 停止更新并设置下载进度为0%
    function stopUpdating() {
        downloadedData = 0; // 停止更新时，设置进度为 0%
        updateChart();
    }

    // 控制图表更新的时间段
    function controlUpdateCycle() {
        const { hours, minutes } = getCurrentTime();

        // 判断时间是否在指定的时间段内
        if (
            (hours === 2 && minutes >= 0 && minutes < 30) ||  // 凌晨 2:00-2:30
            (hours === 8 && minutes >= 0 && minutes < 30) ||  // 早上 8:00-8:30
            (hours === 14 && minutes >= 0 && minutes < 30) || // 下午 2:00-2:30
            (hours === 20 && minutes >= 0 && minutes < 30)    // 下午 8:00-8:30
        ) {
            startUpdating(); // 启动更新图表
        } else {
            stopUpdating(); // 停止更新，并显示为 0%
        }
    }

    // 初始时判断是否进入更新周期
    controlUpdateCycle();

    // 每分钟检查一次是否进入更新周期
    setInterval(controlUpdateCycle, 60000);

    // 让图表跟随屏幕自动适应
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();


//历史文件下载情况
(function () {
    var myChart = echarts.init(document.getElementById('chart1-2'));

    // 获取当前日期和昨天的日期
    function getDates() {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const format = date => `${date.getMonth() + 1}.${date.getDate()}`;
        return [format(yesterday), format(today)];
    }

    // 使用当前的月份和日期作为种子生成伪随机数
    function getRandomValue(seed) {
        const x = Math.sin(seed) * 10000;
        return Math.floor((x - Math.floor(x)) * (99 - 79 + 1)) + 79;
    }

    // 生成数据
    const [yesterdayDate, todayDate] = getDates();
    const seed = new Date().getMonth() * 100 + new Date().getDate(); // 使用当前的月份和日期作为种子
    const data1 = {
        date: yesterdayDate,
        '00': getRandomValue(seed),
        '06': getRandomValue(seed + 1),
        '12': getRandomValue(seed + 2),
        '18': getRandomValue(seed + 3)
    };
    const data2 = {
        date: todayDate,
        '00': getRandomValue(seed + 4),
        '06': getRandomValue(seed + 5),
        '12': getRandomValue(seed + 6),
        '18': getRandomValue(seed + 7)
    };

    // 根据当前时间确定展示的数据
    function getDataToShow() {
        const now = new Date();
        const hour = now.getHours();

        if (hour >= 0 && hour < 2) {
            return [];
        } else if (hour >= 2 && hour < 8) {
            return ['00'];
        } else if (hour >= 8 && hour < 14) {
            return ['00', '06'];
        } else if (hour >= 14 && hour < 20) {
            return ['00', '06', '12'];
        } else {
            return ['00', '06', '12', '18'];
        }
    }

    // 设置初始图表配置
    function setOption(data1, data2) {
        const dataToShow = getDataToShow();
        var option = {
            grid: {
                left: "5%",
                top: "25px",
                right: "0%",
                bottom: "10%",
                containLabel: true
            },
            tooltip: {},
            legend: {
                data: ['00', '06', '12', '18'],
                textStyle: {
                    color: '#fff'
                }
            },
            xAxis: {
                data: [data1.date, data2.date],
                axisLabel: {
                    color: '#fff'
                },
            },
            yAxis: {
                axisLabel: {
                    color: '#fff'
                },
            },
            series: [
                { name: '00', type: 'bar', data: [data1['00'], dataToShow.includes('00') ? data2['00'] : null], itemStyle: { color: '#247ce2' } },
                { name: '06', type: 'bar', data: [data1['06'], dataToShow.includes('06') ? data2['06'] : null], itemStyle: { color: '#76ef3e' } },
                { name: '12', type: 'bar', data: [data1['12'], dataToShow.includes('12') ? data2['12'] : null], itemStyle: { color: '#d5eb11' } },
                { name: '18', type: 'bar', data: [data1['18'], dataToShow.includes('18') ? data2['18'] : null], itemStyle: { color: '#eaaf31' } }
            ]
        };
        myChart.setOption(option);
    }

    // 初始化图表
    setOption(data1, data2);
})();

//轨道数据
document.addEventListener('DOMContentLoaded', function () {
    // 定义文件路径和刷新间隔
    const DATA_URL = 'data/orbit_result.json';
    const REFRESH_INTERVAL = 60 * 1000; // 每分钟读取一次
    const UPDATE_INTERVAL = 5000; // 每5秒更新一次图表

    // 获取图表 DOM 元素和 ECharts 实例
    const chartDom = document.getElementById('mtable');
    const myChart = echarts.init(chartDom);

    // 获取系统选择按钮和维度选择按钮
    const systemButtons = document.querySelectorAll('.button-group button');
    const dimensionButtons = document.querySelectorAll('.dimension-group button');

    // 定义定时器 ID 和其他变量
    let intervalId;
    let currentIdx = 0;
    let zoomStart = 0; // 初始滑动块起始位置
    let zoomEnd = 50; // 初始滑动块结束位置
    let data = {}; // 存储从服务器获取的数据
    let selectedSystem = 'BDS'; // 当前选中的系统
    let selectedDimension = 'all'; // 当前选中的维度
    //异步加载数据和懒加载图表：
    // 初始化图表配置
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: function (params) {
                if (params && params.length > 0) {
                    const satellite = params[0].name;
                    let tooltipHtml = `${satellite}<br/>`;
                    params.forEach(param => {
                        const value = parseFloat(param.value);
                        tooltipHtml += `${param.seriesName}: ${isNaN(value) ? 'N/A' : value.toFixed(4)} mm<br/>`;
                    });
                    return tooltipHtml;
                }
                return '';
            }
        },
        grid: {
            left: "5px",
            top: "25px",
            right: "0%",
            bottom: "20%",
            containLabel: true
        },
        legend: {
            data: ['a', 'c', 'r'],
            textStyle: {
                color: '#fff'
            }
        },
        xAxis: {
            type: 'category',
            data: [],
            axisLabel: {
                color: '#fff'
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#fff'
            },
        },
        series: [
            { name: 'a', type: 'bar', stack: 'total', data: [], show: true, itemStyle: { color: '#247ce2' } },
            { name: 'c', type: 'bar', stack: 'total', data: [], show: true, itemStyle: { color: '#76ef3e' } },
            { name: 'r', type: 'bar', stack: 'total', data: [], show: true, itemStyle: { color: '#eaaf31' } }
        ],
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                filterMode: 'filter',
                start: zoomStart,
                end: zoomEnd,
                handleSize: '50%',
                handleColor: '#d5eb11',
                handleIcon: 'M-10,0a10,10,0,1,0,20,0a10,10,0,1,0,-20,0',
                handleStyle: {
                    color: '#d5eb11',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.4)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    borderWidth: 1,
                    borderColor: '#d5eb11'
                },
                fillerColor: 'rgba(0, 0, 0, 0.2)',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderColor: '#ccc',
                borderWidth: 0.5,
                textStyle: {
                    color: '#fff'
                },
                bottom: '10%'
            }
        ]
    };

    // 监听 dataZoom 事件
    myChart.on('datazoom', function (params) {
        zoomStart = params.start;
        zoomEnd = params.end;
    });

    // 定时读取 JSON 文件
    function fetchData() {
        fetch(DATA_URL)
            .then(response => response.json())
            .then(newData => {
                data = newData;
                const times = Object.keys(data);
                startDynamicUpdate(times, data);
                updateChartData(data[times[0]][selectedSystem]); // 初始加载数据
            })
            .catch(error => console.error('Error loading the data:', error));
    }

    // 每分钟读取一次 JSON 文件
    setInterval(fetchData, REFRESH_INTERVAL);

    // 初始加载数据
    fetchData();

    // 添加系统按钮点击事件监听器
    systemButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            toggleActiveClass(systemButtons, event.target);
            selectedSystem = event.target.getAttribute('data-system');
            stopDynamicUpdate();
            const times = Object.keys(data);
            const selectedTime = times[currentIdx];
            const selectedData = data[selectedTime][selectedSystem];
            updateChartData(selectedData); // 立即更新图表
            startDynamicUpdate(times, data); // 重新启动定时更新
        });
    });

    // 添加维度按钮点击事件监听器
    dimensionButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            toggleActiveClass(dimensionButtons, event.target);
            selectedDimension = event.target.getAttribute('data-dimension');
            updateChartVisibility(selectedDimension); // 立即更新图表可见性
        });
    });

    // 初始激活 BDS 按钮
    systemButtons[0].classList.add('active');

    // 开始动态更新图表
    function startDynamicUpdate(times, data) {
        currentIdx = 0;
        intervalId = setInterval(() => {
            const selectedTime = times[currentIdx];
            const selectedData = data[selectedTime][selectedSystem];
            updateChartData(selectedData);
            currentIdx = (currentIdx + 1) % times.length; // 循环更新
        }, UPDATE_INTERVAL); // 每5秒更新一次
    }

    // 停止动态更新图表
    function stopDynamicUpdate() {
        clearInterval(intervalId);
    }

    // 更新图表数据
    function updateChartData(selectedData) {
        const filteredData = filterDataByZoom(selectedData, zoomStart, zoomEnd);
        updateSeriesData(filteredData);
        updateXAxisData(filteredData);
        updateDataZoom();

        // 禁用动画效果
        myChart.setOption(option, { notMerge: false, lazyUpdate: false });
    }

    // 更新图表可见性
    function updateChartVisibility(selectedDimension) {
        option.series.forEach(series => {
            series.show = series.name === selectedDimension || selectedDimension === 'all';
        });
        myChart.setOption(option, { notMerge: false, lazyUpdate: false });
    }

    // 切换按钮的 active 类
    function toggleActiveClass(buttons, target) {
        buttons.forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
    }

    // 根据 dataZoom 的范围过滤数据
    function filterDataByZoom(data, start, end) {
        const startIndex = Math.floor((data.length * start) / 100);
        const endIndex = Math.ceil((data.length * end) / 100);
        return data.slice(startIndex, endIndex);
    }

    // 更新系列数据
    function updateSeriesData(data) {
        option.series[0].data = data.map(item => parseFloat(item.x).toFixed(4));
        option.series[1].data = data.map(item => parseFloat(item.y).toFixed(4));
        option.series[2].data = data.map(item => parseFloat(item.z).toFixed(4));
    }

    // 更新 X 轴数据
    function updateXAxisData(data) {
        option.xAxis.data = data.map(item => item.satellite);
    }

    // 更新 dataZoom 的 start 和 end 值
    function updateDataZoom() {
        option.dataZoom[0].start = zoomStart;
        option.dataZoom[0].end = zoomEnd;
    }
});


