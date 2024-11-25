(function () {
   // 配置项
    const config = {
        filePath: 'data/count_records.json',  // JSON文件路径
        updateInterval: 60 * 60 * 1000,       // 更新间隔（毫秒），每小时更新一次
        chartId: 'chartj-1'                   // 图表DOM元素ID
    };

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(config.chartId));

    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
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
            }
        },
        yAxis: {
            axisLabel: {
                color: '#fff'
            }
        },
        series: [{
            name: '数量',
            type: 'bar',
            data: [],
            itemStyle: { color: '#247ce2' }
        }],
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                start: 50,
                end: 100,
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
            },
            {
                type: 'inside',
                xAxisIndex: [0],
                start: 0,
                end: 50
            }
        ]
    };

    // 读取JSON文件内容
    fetch(config.filePath)
        .then(response => response.json())
        .then(jsonData => {
            const dataKey = Object.keys(jsonData)[0]; // 获取第一个键，即日期
            const totalData = jsonData[dataKey];
            const keys = Object.keys(totalData);
            const values = Object.values(totalData);

            // 初始化数据
            const initialData = initializeData(new Date(), keys, values);
            option.xAxis.data = keys;
            option.series[0].data = initialData;

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

            // 每小时更新数据
            setInterval(() => {
                updateData(new Date(), keys, values, initialData);
            }, config.updateInterval);  // 每小时更新一次
        })
        .catch(error => console.error('Error:', error));

    function initializeData(currentTime, keys, values) {
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();

        return keys.map((key, index) => {
            const jsonValue = values[index];

            if (currentHour >= jsonValue) {
                // 当前时间的小时数大于等于JSON中的数据，直接使用JSON中的数据
                return jsonValue;
            } else {
                // 根据当前时间的分钟数生成对应的数据
                const displayHour = currentMinute < 31 ? currentHour : currentHour + 1;
                return displayHour;
            }
        });
    }

    function updateData(currentTime, keys, values, initialData) {
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        const displayHour = currentMinute < 31 ? currentHour : currentHour + 1;

        option.series[0].data = keys.map((key, index) => {
            const jsonValue = values[index];
            const currentValue = initialData[index];

            if (currentHour >= jsonValue) {
                // 当前时间的小时数大于等于JSON中的数据，直接使用JSON中的数据
                return jsonValue;
            } else {
                // 如果当前值小于JSON中的值，根据当前时间的分钟数生成对应的数据
                return Math.min(displayHour, jsonValue);
            }
        });

        // 更新图表
        myChart.setOption(option);
    }
})();

//坐标变化
(function () {
    // 配置项
    const config = {
        dataFilePath: 'data/diff_records.json', // 数据文件路径
        updateInterval: 1000 * 60 * 60, // 数据更新频率（毫秒）
        initialDateKey: '2024-327' // 初始日期键
    };

    // 初始化图表
    var myChart = echarts.init(document.getElementById('chartj-2'));

    // 图表的基本配置
    const chartConfig = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                let tooltipHtml = `<div><b>${params[0].name}</b></div>`; // 显示 X 轴的值
                params.forEach(function (item) {
                    tooltipHtml += `${item.seriesName}: ${item.value} mm<br/>`;
                });
                return tooltipHtml;
            }
        },
        legend: {
            data: ['x', 'y', 'H'],
            textStyle: {
                color: '#ffffff',
                fontSize: "12"
            }
        },
        grid: {
            left: "5px",
            top: "25px",
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
        dataZoom: {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 50,
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
        },
        series: [
            { name: 'x', type: 'bar', stack: '总量', data: [], itemStyle: { color: '#247ce2' } },
            { name: 'y', type: 'bar', stack: '总量', data: [], itemStyle: { color: '#76ef3e' } },
            { name: 'H', type: 'bar', stack: '总量', data: [], itemStyle: { color: '#eaaf31' } }
        ]
    };

    myChart.setOption(chartConfig);

    // 更新图表数据的函数
    function updateChartData(data) {
        let categories = [];
        let dxValues = [], dyValues = [], dzValues = [];

        for (let i = 0; i < data.length; i++) {
            categories.push(data[i].name);
            dxValues.push(data[i].x * 1000); // 将 x 值从米转换为毫米
            dyValues.push(data[i].y * 1000); // 将 y 值从米转换为毫米
            dzValues.push(data[i].h * 1000); // 将 H 值从米转换为毫米
        }

        myChart.setOption({
            xAxis: { data: categories },
            series: [
                { name: 'x', data: dxValues },
                { name: 'y', data: dyValues },
                { name: 'H', data: dzValues }
            ]
        });
    }

    // 异步获取数据的函数
    async function fetchData() {
        try {
            const response = await fetch(config.dataFilePath);
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            console.error('Error fetching the JSON file:', error);
        }
    }

    // 展示下一批数据的函数
    async function showNextData(data) {
        const keys = Object.keys(data).sort();
        let currentIndex = 0;

        function displayNext() {
            if (currentIndex < keys.length) {
                const key = keys[currentIndex];
                const items = data[key];
                updateChartData(items);
                currentIndex++;
                setTimeout(displayNext, config.updateInterval); // 每2秒更新一次数据
            } else {
                currentIndex = 0; // 重置索引
                setTimeout(displayNext, config.updateInterval); // 重新开始循环
            }
        }

        displayNext();
    }

    // 加载 JSON 文件并开始展示数据
    fetchData().then(data => {
        if (data && data[config.initialDateKey]) {
            showNextData(data[config.initialDateKey]);
        } else {
            console.error('No data found for the specified date.');
        }
    });
})();
