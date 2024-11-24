(function () {
    // 随机数生成函数
    function getRandomFloatAround(min, max, center, decimals) {
        let range = (max - min) / 2;
        let randomValue = (Math.random() * range * 2) - range + center;
        return parseFloat(randomValue.toFixed(decimals));
    }

    // 更新在线时长（每秒执行）
    function updateOnlineTime(stations) {
        stations.forEach(station => {
            if (station.cells[1].textContent === '在线') {
                let [h, m, s] = station.cells[2].textContent.split(':').map(Number);
                s += 1; // 每秒增加1秒
                if (s >= 60) { m++; s = 0; }
                if (m >= 60) { h++; m = 0; }
                station.cells[2].textContent = `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            }
        });
    }

    // 更新数据量和总数据量（根据类型处理）
    function updateData(stations, type) {
        stations.forEach(station => {
            if (station.cells[1].textContent === '在线') {
                let [h, m, s] = station.cells[2].textContent.split(':').map(Number);
                let onlineSeconds = h * 3600 + m * 60 + s;

                let currentData, totalData;

                // 按类型生成数据量和总数据量
                if (type === 'USER') {
                    currentData = getRandomFloatAround(1.25, 1.35, 1.3, 3); // 1.3KB左右
                    if (!station.dataset.initialized) {
                        station.dataset.initialized = true;
                        totalData = (currentData / 5) * onlineSeconds / 1024; // 初始化总数据量
                        station.cells[4].textContent = `${totalData.toFixed(2)}MB`;
                    } else {
                        totalData = parseFloat(station.cells[4].textContent.split('MB')[0]) || 0;
                        totalData += (currentData / 5) * 5 / 1024;
                        station.cells[4].textContent = `${totalData.toFixed(2)}MB`;
                    }
                } else if (type === 'CORS') {
                    currentData = getRandomFloatAround(0.85, 0.95, 0.9, 3); // 0.9KB左右
                    if (!station.dataset.initialized) {
                        station.dataset.initialized = true;
                        totalData = currentData * onlineSeconds / 1024; // 初始化总数据量
                        station.cells[4].textContent = `${totalData.toFixed(2)}MB`;
                    } else {
                        totalData = parseFloat(station.cells[4].textContent.split('MB')[0]) || 0;
                        totalData += currentData / 1024;
                        station.cells[4].textContent = `${totalData.toFixed(2)}MB`;
                    }
                } else if (type === 'WANGGE') {
                    currentData = getRandomFloatAround(1.25, 1.35, 1.3, 3); // 1.3KB左右
                    if (!station.dataset.initialized) {
                        station.dataset.initialized = true;
                        totalData = currentData * onlineSeconds / 1024; // 初始化总数据量
                        station.cells[4].textContent = `${totalData.toFixed(2)}MB`;
                    } else {
                        totalData = parseFloat(station.cells[4].textContent.split('MB')[0]) || 0;
                        totalData += currentData / 1024;
                        station.cells[4].textContent = `${totalData.toFixed(2)}MB`;
                    }
                }

                // 更新当前数据量
                station.cells[3].textContent = `${currentData}KB`;
            }
        });
    }

    // 主函数
    window.onload = function () {
        const userTables = document.querySelectorAll('.USER'); // USER表格
        const corsTables = document.querySelectorAll('.CORS'); // CORS表格
        const wanggeTables = document.querySelectorAll('.WANGGE'); // WANGGE表格

        // 每秒更新在线时长
        setInterval(() => {
            [userTables, corsTables, wanggeTables].forEach(tables => {
                tables.forEach(table => {
                    const stations = table.querySelectorAll('tr:not(:first-child)');
                    updateOnlineTime(stations);
                });
            });
        }, 1000);

        // 每5秒更新USER的数据量和总数据量
        setInterval(() => {
            userTables.forEach(table => {
                const stations = table.querySelectorAll('tr:not(:first-child)');
                updateData(stations, 'USER');
            });
        }, 5000);

        // 每秒更新CORS和WANGGE的数据量和总数据量
        setInterval(() => {
            corsTables.forEach(table => {
                const stations = table.querySelectorAll('tr:not(:first-child)');
                updateData(stations, 'CORS');
            });
            wanggeTables.forEach(table => {
                const stations = table.querySelectorAll('tr:not(:first-child)');
                updateData(stations, 'WANGGE');
            });
        }, 1000);
    };
})();
