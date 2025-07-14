// AURORA Blog Lottie Integration - Pure JavaScript Implementation
// 纯 JavaScript 实现的 Lottie 动画集成

document.addEventListener('DOMContentLoaded', function() {
    console.log('Lottie Integration loaded');
    
    // 初始化主题 - Initialize theme
    initializeTheme();
    
    // 初始化 Lottie 动画 - Initialize Lottie animations
    initializeLottieAnimations();
    
    // 初始化交互功能 - Initialize interactions
    initializeInteractions();
});

// 主题初始化 - Theme initialization
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    
    // 主题切换按钮 - Theme toggle button
    const themeToggle = document.querySelector('.theme-btn');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = document.documentElement.classList.contains('dark');
            document.documentElement.classList.toggle('dark', !isDark);
            localStorage.setItem('theme', isDark ? 'light' : 'dark');
        });
    }
}

// Lottie 动画初始化 - Lottie animation initialization
function initializeLottieAnimations() {
    const heroAnimation = document.querySelector('.hero-animation');
    if (!heroAnimation) return;
    
    // 检测用户偏好 - Check user preferences
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    
    if (reducedMotion || isMobile) {
        showStaticFallback(heroAnimation);
        return;
    }
    
    // 懒加载动画 - Lazy load animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadLottieAnimation(heroAnimation);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(heroAnimation);
}

// 加载 Lottie 动画 - Load Lottie animation
function loadLottieAnimation(container) {
    // 由于我们不能直接使用 lottie-web，我们创建一个 CSS 动画替代
    // Since we can't directly use lottie-web, we create a CSS animation alternative
    const animationContainer = container.querySelector('.lottie-container');
    if (animationContainer) {
        animationContainer.innerHTML = `
            <div class="css-particle-animation">
                <div class="particle particle-1"></div>
                <div class="particle particle-2"></div>
                <div class="particle particle-3"></div>
                <div class="particle particle-4"></div>
                <div class="particle particle-5"></div>
            </div>
        `;
        animationContainer.style.opacity = '1';
        
        // 设置鼠标交互 - Setup mouse interactions
        setupMouseInteractions(animationContainer);
    }
}

// 鼠标交互设置 - Mouse interaction setup
function setupMouseInteractions(container) {
    let lastTime = 0;
    const throttleMs = 16; // 60fps
    
    const mouseMoveHandler = (event) => {
        const now = Date.now();
        if (now - lastTime < throttleMs) return;
        lastTime = now;
        
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // 150px 范围内的粒子跟随效果 - Particle following within 150px range
        if (distance < 150) {
            const particles = container.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                const offset = (index + 1) * 10;
                const x = (deltaX / distance) * offset;
                const y = (deltaY / distance) * offset;
                particle.style.transform = `translate(${x}px, ${y}px)`;
            });
        }
    };
    
    document.addEventListener('pointermove', mouseMoveHandler, { passive: true });
}

// 静态降级显示 - Static fallback display
function showStaticFallback(container) {
    const animationContainer = container.querySelector('.lottie-container');
    if (animationContainer) {
        animationContainer.innerHTML = `
            <div class="hero-static-bg">
                <div class="gradient-orb"></div>
                <div class="gradient-orb secondary"></div>
            </div>
        `;
        animationContainer.style.opacity = '1';
    }
}

// 交互功能初始化 - Interactions initialization
function initializeInteractions() {
    // 下拉菜单 - Dropdown menus
    initializeDropdowns();
    
    // 搜索功能 - Search functionality
    initializeSearch();
    
    // 语言切换器 - Language switcher
    initializeLanguageSwitcher();
}

// 下拉菜单初始化 - Dropdown initialization
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.user-menu');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.user-avatar');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (trigger && menu) {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                menu.classList.toggle('show');
            });
            
            // 点击外部关闭 - Close on outside click
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    menu.classList.remove('show');
                }
            });
        }
    });
}

// 搜索功能初始化 - Search initialization
function initializeSearch() {
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchQuery = prompt('Search for posts...');
            if (searchQuery) {
                window.location.href = `/posts?q[title_cont]=${encodeURIComponent(searchQuery)}`;
            }
        });
    }
}

// 语言切换器初始化 - Language switcher initialization
function initializeLanguageSwitcher() {
    // 移动端语言切换 - Mobile language switcher
    const mobileTrigger = document.getElementById('mobile-language-trigger');
    const mobileMenu = document.getElementById('mobile-language-menu');
    
    if (mobileTrigger && mobileMenu) {
        mobileTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.toggle('show');
        });
        
        document.addEventListener('click', function(e) {
            if (!mobileTrigger.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('show');
            }
        });
    }
}
