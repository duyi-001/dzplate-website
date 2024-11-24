// 定义基础图片名称和路径
const baseImages = {
    电离层: ["20241018_090000.png", "20241018_100000.png", "20241018_110000.png", "20241018_120000.png", "20241018_130000.png", "20241018_140000.png",
        "20241018_150000.png", "20241018_160000.png", "20241018_170000.png", "20241018_180000.png", "20241018_190000.png", "20241018_200000.png", "20241018_210000.png", "20241018_220000.png", "20241018_230000.png"],
    对流层: ["11.png", "12.png", "14.png", "15.png", "16.png", "17.png", "18.png", "19.png", "20.png"]
};

const folders = {
    电离层: "images/",
    对流层: "images/"
};

// 直接在 imageSets 中生成图片路径
const imageSets = {
    dynamicImage1: baseImages.电离层.map(img => folders.电离层 + img),
    dynamicImage2: baseImages.对流层.map(img => folders.对流层 + img)
};

// 获取所有需要动态显示图片的 img 元素
const images = document.querySelectorAll('.model5Link1 img');

// 遍历每个 img 元素并设置图片轮换
images.forEach(img => {
    const imgId = img.id;
    const imagesArray = imageSets[imgId];

    if (imagesArray) {
        let currentIndex = 0;

        // 检查图片是否已进入视口
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        // 更新图片源
        function updateImageSrc() {
            if (isInViewport(img)) {
                img.src = imagesArray[currentIndex];
                img.removeAttribute('data-src'); // 移除 data-src 属性防止重复加载
            }
        }

        // 更改图片
        function changeImage() {
            currentIndex = (currentIndex + 1) % imagesArray.length;
            updateImageSrc();
        }

        // 初始化图片
        updateImageSrc();

        // 设置定时器
        setInterval(changeImage, 1000 * 60 * 15);

        // 监听滚动事件
        window.addEventListener('scroll', updateImageSrc);
    }
});