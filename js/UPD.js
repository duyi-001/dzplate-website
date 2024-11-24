// 3-1 宽巷UPD
(function () {
    const jsonDataUrl = 'data/widelane1.json';
    const myChart1 = echarts.init(document.getElementById('mtable3-1'));
    let currentType1 = 'BDS';
    let data1 = null;
    let currentIndex1 = 29; // 第30组数据的索引，数组索引从0开始
    let currentDateIndex1 = 0; // 当前展示的日期索引

    // 加载数据函数
    async function loadData1() {
        try {
            const response = await fetch(jsonDataUrl);
            const fetchedData = await response.json();
            data1 = prepareData1(fetchedData);
            updateChartData1(currentDateIndex1, currentIndex1);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    // 数据预处理
    function prepareData1(fetchedData) {
        const preparedData = [];
        const dates = Object.keys(fetchedData);

        for (const date of dates) {
            const timeSlots = Object.keys(fetchedData[date]);
            for (const timeSlot of timeSlots) {
                const types = fetchedData[date][timeSlot];
                preparedData.push({ date, timeSlot, types });
            }
        }
        return preparedData;
    }

    // 更新图表
    function updateChartData1(dateIndex, index) {
        if (dateIndex >= data1.length / 24) {
            console.log('No more data available.');
            return;
        }

        const { date, timeSlot, types } = data1[dateIndex * 24 + index]; // 假设每天有24个时间槽
        const chartData = types[currentType1] || [];

        if (chartData.length === 0) {
            console.log('No data available for the selected type.');
            return;
        }

        const names = chartData.map(item => item.satellite);
        const values = chartData.map(item => parseFloat(item.value).toFixed(4));

        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: params => {
                    if (params.length > 0) {
                        const name = params[0].name;
                        const value = parseFloat(params[0].value).toFixed(4);
                        return `${name}: ${value} 周(RMS)`;
                    }
                    return '';
                }
            },
            grid: {
                left: "5px",
                top: "10px",
                right: "0%",
                bottom: "8%",
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: names,
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
                name: '宽巷UPD',
                type: 'bar',
                data: values,
                barWidth: '60%',
                itemStyle: { color: '#247ce2' }
            }]
        };

        myChart1.setOption(option, true);
    }

    // 初始加载数据
    loadData1();

    // 设置默认按钮高亮
    document.querySelector(`#chart-area-1 .button-group button[data-type="${currentType1}"]`).classList.add('active');

    // 绑定按钮点击事件
    document.querySelectorAll('#chart-area-1 .button-group button').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('#chart-area-1 .button-group button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentType1 = this.getAttribute('data-type');
            updateChartData1(currentDateIndex1, currentIndex1); // 更新图表显示
        });
    });

    // 公共函数，用于更新宽巷图表
    window.updateWidelaneChart = function (dateIndex, index) {
        updateChartData1(dateIndex, index);
    };
})();

// 3-2 窄巷UPD
(function () {
    const jsonDataUrl = 'data/narrowlane1.json';
    const myChart2 = echarts.init(document.getElementById('mtable3-2'));
    let currentType2 = 'BDS';
    let data2 = null;
    let currentIndex2 = 0;
    let currentDateIndex2 = 0; // 当前展示的日期索引
    let currentTooltipIndex2 = null; // 记录当前工具提示的索引
    const updateInterval2 = 30000; // 更新时间间隔，单位毫秒

    // 创建加载指示器
    const loadingElement2 = document.createElement('div');
    loadingElement2.style.position = 'absolute';
    loadingElement2.style.top = '50%';
    loadingElement2.style.left = '50%';
    loadingElement2.style.transform = 'translate(-50%, -50%)';
    loadingElement2.style.fontSize = '24px';
    loadingElement2.textContent = 'Loading...';
    document.body.appendChild(loadingElement2);

    // 异步加载数据
    async function fetchData2() {
        try {
            const response = await fetch(jsonDataUrl);
            const fetchedData = await response.json();
            data2 = prepareData2(fetchedData);
            updateChartData2(currentDateIndex2, currentIndex2);
        } catch (error) {
            console.error('Error loading data:', error);
            removeLoadingIndicator2();
        }
    }

    // 数据预处理
    function prepareData2(fetchedData) {
        const preparedData = [];
        const dates = Object.keys(fetchedData);

        for (const date of dates) {
            const timeSlots = Object.keys(fetchedData[date]);
            for (const timeSlot of timeSlots) {
                const types = fetchedData[date][timeSlot];
                preparedData.push({ date, timeSlot, types });
            }
        }

        removeLoadingIndicator2();
        return preparedData;
    }

    // 移除加载指示器
    function removeLoadingIndicator2() {
        if (loadingElement2.parentNode) {
            loadingElement2.parentNode.removeChild(loadingElement2);
        }
    }

    // 更新图表
    function updateChartData2(dateIndex, index) {
        if (index >= data2.length) {
            console.log('No more data available.');
            clearInterval(interval2);
            return;
        }

        const { date, timeSlot, types } = data2[index];
        const chartData = types[currentType2] || [];

        if (chartData.length === 0) {
            currentIndex2++;
            return;
        }

        const names = chartData.map(item => item.satellite);
        const values = chartData.map(item => parseFloat(item.value).toFixed(4));

        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: params => {
                    if (params.length > 0) {
                        const name = params[0].name;
                        const value = parseFloat(params[0].value).toFixed(4);
                        return `${name}: ${value} 周(RMS)`;
                    }
                    return '';
                }
            },
            grid: {
                left: "5px",
                top: "10px",
                right: "0%",
                bottom: "8%",
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: names,
                axisLabel: {
                    color: '#fff'
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: '#fff',
                    formatter: value => parseFloat(value).toFixed(3) // 保留三位小数
                },
            },
            series: [{
                name: '窄巷UPD',
                type: 'bar',
                data: values,
                barWidth: '60%',
                itemStyle: { color: '#247ce2' }
            }]
        };

        myChart2.setOption(option, true);

        // 恢复工具提示
        if (currentTooltipIndex2 !== null) {
            myChart2.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: currentTooltipIndex2
            });
        }

        currentIndex2++;
        if (currentIndex2 >= data2.length || (currentIndex2 > 0 && data2[currentIndex2].date !== date)) { // 判断是否已经展示完当天所有数据
            currentIndex2 = 0; // 重置到第一个时间槽
            currentDateIndex2++; // 更新到下一天

            // 当窄巷图表完成一天的数据展示后，更新宽巷图表
            if (window.updateWidelaneChart) {
                currentIndex1 = 29; // 宽巷UPD重置到第30组数据
                window.updateWidelaneChart(currentDateIndex2 - 1, currentIndex1); // 更新宽巷UPD
            }
        }
    }

    // 初始化加载数据
    fetchData2();

    // 设置默认按钮高亮
    document.querySelector(`#chart-area-2 .button-group button[data-type="${currentType2}"]`).classList.add('active');

    // 绑定按钮点击事件
    document.querySelectorAll('#chart-area-2 .button-group button').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelectorAll('#chart-area-2 .button-group button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentType2 = this.getAttribute('data-type');
            currentIndex2 = 0;
            currentDateIndex2 = 0;
            updateChartData2(currentDateIndex2, currentIndex2);
        });
    });

    let interval2 = setInterval(() => {
        updateChartData2(currentDateIndex2, currentIndex2);
    }, updateInterval2);
})();