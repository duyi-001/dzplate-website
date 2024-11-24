//钟差数据柱状图展示
document.addEventListener('DOMContentLoaded', function () {
    // 配置常量
    const chartDom = document.getElementById('mtable2'); // 图表容器元素
    const myChart = echarts.init(chartDom); // 初始化 ECharts 实例
    const systemButtons = document.querySelectorAll('.button-group button'); // 系统选择按钮
    const DATA_URL = 'data/clock_result.json'; // 数据文件路径
    const REFRESH_INTERVAL = 60 * 1000; // 每分钟读取一次数据
    const UPDATE_INTERVAL = 5000; // 每5秒更新一次图表数据
    const ZOOM_START = 0; // 初始滑动块起始位置
    const ZOOM_END = 30; // 初始滑动块结束位置

    let intervalId;
    let currentIdx = 0;
    let zoomStart = ZOOM_START;
    let zoomEnd = ZOOM_END;
    let data = {}; // 存储当前数据
    let selectedSystem = 'BDS'; // 当前选中的系统

    // 初始化图表配置
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: function (params) {
                if (params && params.length > 0) {
                    const value = parseFloat(params[0].value);
                    return params[0].name + ': ' + (isNaN(value) ? 'N/A' : value.toFixed(6) + ' ns');
                }
                return '';
            }
        },
        grid: {
            left: "5px",
            top: "10px",
            right: "0%",
            bottom: "20%",
            containLabel: true
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
        series: [{
            name: 'Value',
            type: 'bar',
            data: [],
            itemStyle: { color: '#247ce2' }
        }],
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

    // 监听 dataZoom 事件，更新滑动块的位置
    myChart.on('datazoom', function (params) {
        zoomStart = params.start;
        zoomEnd = params.end;
    });
    //异步加载数据：确保数据请求是异步的，避免阻塞页面渲染。
    //使用 CDN：使用内容分发网络（CDN）加速资源加载。
    // 定时读取 JSON 文件
    function fetchData() {
        fetch(DATA_URL)
            .then(response => response.json())
            .then(newData => {
                data = newData;
                const times = Object.keys(data);
                if (times.length > 0) {
                    const initialTime = times[0];
                    const initialData = data[initialTime][selectedSystem];
                    updateChartData(initialData); // 初始加载数据
                }
                startDynamicUpdate(times, data);
            })
            .catch(error => console.error('Error loading the data:', error));
    }

    // 每分钟读取一次 JSON 文件
    setInterval(fetchData, REFRESH_INTERVAL);

    // 初始加载数据
    fetchData();

    // 添加按钮点击事件监听器
    systemButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            toggleActiveClass(systemButtons, event.target);
            selectedSystem = event.target.getAttribute('data-system');
            const times = Object.keys(data);
            const selectedTime = times[currentIdx];
            const selectedData = data[selectedTime] ? data[selectedTime][selectedSystem] : [];
            updateChartData(selectedData); // 立即更新图表
        });
    });

    // 初始激活 BDS 按钮
    systemButtons[0].classList.add('active');

    // 开始动态更新图表
    function startDynamicUpdate(times, data) {
        currentIdx = 0;
        clearInterval(intervalId); // 清除之前的定时器
        intervalId = setInterval(() => {
            const selectedTime = times[currentIdx];
            const selectedData = data[selectedTime] ? data[selectedTime][selectedSystem] : [];

            // 更新图表数据
            updateChartData(selectedData);

            currentIdx = (currentIdx + 1) % times.length; // 循环更新
        }, UPDATE_INTERVAL); // 每5秒更新一次
    }

    // 更新图表数据
    function updateChartData(selectedData) {
        option.xAxis.data = selectedData.map(item => item.satellite);
        option.series[0].data = selectedData.map(item => (parseFloat(item.value) / 100).toFixed(6));

        // 手动设置 dataZoom 的 start 和 end 值
        option.dataZoom[0].start = zoomStart;
        option.dataZoom[0].end = zoomEnd;

        myChart.setOption(option);
    }

    // 切换按钮的 active 类
    function toggleActiveClass(buttons, target) {
        buttons.forEach(btn => btn.classList.remove('active'));
        target.classList.add('active');
    }
});