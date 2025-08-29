const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement; // 获取 <html> 元素

// --- 功能 1: 主题切换 ---

// 检查本地存储中是否有主题偏好
const savedTheme = localStorage.getItem('theme');
// 检查系统颜色偏好
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// 应用初始主题
function applyInitialTheme() {
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkScheme.matches) {
        htmlElement.setAttribute('data-theme', 'dark');
    } else {
        htmlElement.setAttribute('data-theme', 'light'); // 默认亮色
    }
}

// 切换主题函数
function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    // 将新主题保存到本地存储
    localStorage.setItem('theme', newTheme);
}

// 给按钮添加点击事件监听器
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// 初始化时应用主题
applyInitialTheme();

// 监听系统颜色方案变化（可选，但体验更好）
prefersDarkScheme.addEventListener('change', (e) => {
    // 仅当用户没有手动设置过主题时，才跟随系统变化
    if (!localStorage.getItem('theme')) {
        applyInitialTheme();
    }
});


// --- 功能 2: 监听滚动，给 Header 添加效果 (可选) ---
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
   let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
   if (scrollTop > 50) { // 滚动超过 50px
       document.body.setAttribute('data-scroll', 'down');
   } else {
       document.body.setAttribute('data-scroll', '0');
   }
   lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
}, false);

// 初始化滚动状态
if (window.pageYOffset > 50) {
    document.body.setAttribute('data-scroll', 'down');
} else {
    document.body.setAttribute('data-scroll', '0');
}