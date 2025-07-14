// AURORA 博客 JavaScript - 原生JS实现
// AURORA Blog JavaScript - Vanilla JS Implementation
// 此文件包含所有交互功能，不依赖Stimulus - This file contains all the interactive features without Stimulus dependency

document.addEventListener('DOMContentLoaded', function() {
    console.log('AURORA Blog JavaScript loaded');

    // 初始化页面过渡效果 - Initialize page transition effects
    initializePageTransitions();

    // 初始化所有组件 - Initialize all components
    initializeSidebar();        // 初始化侧边栏 - Initialize sidebar
    initializeHeader();         // 初始化头部 - Initialize header
    initializeScrollAnimations(); // 初始化滚动动画 - Initialize scroll animations
    init3DTiltEffect();         // 初始化3D倾斜效果 - Initialize 3D tilt effect
    initializeMagneticButtons(); // 初始化磁性按钮 - Initialize magnetic buttons
    initializeSmoothScrolling(); // 初始化平滑滚动 - Initialize smooth scrolling
    initializeNavigation();     // 初始化导航 - Initialize navigation
    initializeLanguageSwitcher(); // 初始化语言切换器 - Initialize language switcher
});

// ===== 侧边栏功能 - SIDEBAR FUNCTIONALITY =====
// 初始化侧边栏交互功能 - Initialize sidebar interaction functionality
function initializeSidebar() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const pageWrapper = document.getElementById('page-wrapper');

    // 如果必要元素不存在则返回 - Return if required elements don't exist
    if (!menuToggle || !sidebar || !pageWrapper) return;

    // 菜单切换点击事件 - Menu toggle click event
    menuToggle.addEventListener('click', function() {
        const isOpen = sidebar.classList.contains('open');

        // 切换侧边栏状态 - Toggle sidebar state
        sidebar.classList.toggle('open');
        pageWrapper.classList.toggle('sidebar-open');
        document.body.classList.toggle('sidebar-open');

        // 更新ARIA属性以提高可访问性 - Update ARIA attributes for accessibility
        menuToggle.setAttribute('aria-expanded', !isOpen);
    });
    
    // 点击外部区域关闭侧边栏 - Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            toggleSidebar();
        }
    });

    // 按Escape键关闭侧边栏 - Close sidebar with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            toggleSidebar();
        }
    });

    // 关闭侧边栏的辅助函数 - Helper function to close sidebar
    function toggleSidebar() {
        sidebar.classList.remove('open');
        pageWrapper.classList.remove('sidebar-open');
        document.body.classList.remove('sidebar-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
}

// ===== HEADER SCROLL EFFECT =====
function initializeHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    
    let ticking = false;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .sidebar-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetPage = this.dataset.page;
            
            if (targetPage) {
                e.preventDefault();
                setActiveNavLink(targetPage);
                
                // Close sidebar if open
                const sidebar = document.getElementById('sidebar');
                if (sidebar && sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                    document.getElementById('page-wrapper').classList.remove('sidebar-open');
                    document.body.classList.remove('sidebar-open');
                }
                
                // Smooth scroll to section
                const targetSection = document.getElementById(targetPage);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

function setActiveNavLink(targetPage) {
    // Update all navigation links
    document.querySelectorAll('.nav-link, .sidebar-nav a').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === targetPage) {
            link.classList.add('active');
        }
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe masonry items
    document.querySelectorAll('.masonry-item').forEach(item => {
        observer.observe(item);
    });

    // Observe other animated elements
    document.querySelectorAll('.journal-card, .skill-item, .contact-item').forEach(item => {
        observer.observe(item);
    });
}

// ===== 3D TILT EFFECT FOR CARDS =====
function init3DTiltEffect() {
    const workCards = document.querySelectorAll('.work-card');
    
    workCards.forEach(card => {
        const inner = card.querySelector('.work-card-inner');
        if (!inner) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const { width, height } = rect;

            const rotateX = ((y / height) - 0.5) * -10;
            const rotateY = ((x / width) - 0.5) * 10;

            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    });
}

// ===== MAGNETIC BUTTON EFFECT =====
function initializeMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        const child = btn.querySelector('.magnetic-text');
        if (!child) return;
        
        let animationFrameId = null;

        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            if (animationFrameId) cancelAnimationFrame(animationFrameId);

            animationFrameId = requestAnimationFrame(() => {
                btn.style.transition = 'none';
                child.style.transition = 'none';
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
                child.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
        });

        btn.addEventListener('mouseleave', () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);

            btn.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
            child.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
            btn.style.transform = 'translate(0, 0)';
            child.style.transform = 'translate(0, 0)';
        });
    });
}

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== 语言切换器功能 - LANGUAGE SWITCHER FUNCTIONALITY =====
// 初始化语言切换器交互 - Initialize language switcher interactions
function initializeLanguageSwitcher() {
    // 移动端下拉菜单 - Mobile dropdown menu
    const mobileTrigger = document.getElementById('mobile-language-trigger');
    const mobileMenu = document.getElementById('mobile-language-menu');

    if (mobileTrigger && mobileMenu) {
        // 点击触发器切换菜单 - Click trigger to toggle menu
        mobileTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const isOpen = mobileMenu.classList.contains('show');

            if (isOpen) {
                closeMobileLanguageMenu();
            } else {
                openMobileLanguageMenu();
            }
        });

        // 点击外部区域关闭菜单 - Click outside to close menu
        document.addEventListener('click', function(e) {
            if (!mobileTrigger.contains(e.target) && !mobileMenu.contains(e.target)) {
                closeMobileLanguageMenu();
            }
        });

        // 按Escape键关闭菜单 - Press Escape to close menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('show')) {
                closeMobileLanguageMenu();
            }
        });
    }

    // 桌面端语言切换器动画 - Desktop language switcher animations
    const languageOptions = document.querySelectorAll('.language-option');
    const languageSwitcherContainer = document.querySelector('.language-switcher-container');

    languageOptions.forEach(option => {
        const link = option.querySelector('.language-link');
        if (link) {
            // 添加点击动画效果 - Add click animation effect
            link.addEventListener('click', function(e) {
                // 添加点击反馈动画 - Add click feedback animation
                option.style.transform = 'scale(0.95)';

                // 添加加载状态 - Add loading state
                if (languageSwitcherContainer) {
                    languageSwitcherContainer.classList.add('language-switching');
                }

                // 添加页面过渡效果 - Add page transition effect
                document.body.style.opacity = '0.8';
                document.body.style.transition = 'opacity 0.3s ease';

                setTimeout(() => {
                    option.style.transform = '';
                }, 150);
            });
        }
    });

    // 移动端语言切换加载状态 - Mobile language switching loading state
    const mobileLanguageItems = document.querySelectorAll('.mobile-language-item');
    mobileLanguageItems.forEach(item => {
        item.addEventListener('click', function() {
            // 添加加载状态 - Add loading state
            const mobileSwitcher = document.querySelector('.mobile-language-switcher');
            if (mobileSwitcher) {
                mobileSwitcher.classList.add('language-switching');
            }

            // 添加页面过渡效果 - Add page transition effect
            document.body.style.opacity = '0.8';
            document.body.style.transition = 'opacity 0.3s ease';
        });
    });

    // 辅助函数：打开移动端语言菜单 - Helper function: open mobile language menu
    function openMobileLanguageMenu() {
        mobileMenu.classList.add('show');
        mobileTrigger.classList.add('active');
        mobileTrigger.setAttribute('aria-expanded', 'true');
    }

    // 辅助函数：关闭移动端语言菜单 - Helper function: close mobile language menu
    function closeMobileLanguageMenu() {
        mobileMenu.classList.remove('show');
        mobileTrigger.classList.remove('active');
        mobileTrigger.setAttribute('aria-expanded', 'false');
    }
}

// ===== 页面过渡效果 - PAGE TRANSITION EFFECTS =====
// 初始化页面过渡动画 - Initialize page transition animations
function initializePageTransitions() {
    // 页面加载完成后的入场动画 - Page entrance animation after loading
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';

        // 为主要内容区域添加过渡类 - Add transition class to main content areas
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.classList.add('page-transition', 'loaded');
        }

        // 为卡片添加渐入动画 - Add fade-in animation to cards
        const cards = document.querySelectorAll('.work-card, .journal-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);

    // 为所有内部链接添加平滑过渡 - Add smooth transitions to all internal links
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]');
    internalLinks.forEach(link => {
        // 排除语言切换链接，它们有自己的处理逻辑 - Exclude language switching links
        if (!link.href.includes('/switch_locale/')) {
            link.addEventListener('click', function(e) {
                // 添加离开动画 - Add exit animation
                document.body.style.opacity = '0.8';
                document.body.style.transition = 'opacity 0.3s ease';
            });
        }
    });

    // 监听浏览器前进后退按钮 - Listen for browser back/forward buttons
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            // 页面从缓存中恢复时重置样式 - Reset styles when page is restored from cache
            document.body.style.opacity = '1';
            document.body.style.transition = '';
        }
    });
}
