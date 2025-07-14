// LottieFiles 风格导航交互 - LottieFiles Style Navigation Interactions
// 完全参考 https://lottiefiles.com/ 的导航行为

document.addEventListener('DOMContentLoaded', function() {
    console.log('LottieFiles Navigation loaded');
    
    // 初始化导航交互 - Initialize navigation interactions
    initializeDropdownNavigation();
    
    // 初始化主题切换 - Initialize theme toggle
    initializeThemeToggle();
    
    // 初始化搜索功能 - Initialize search
    initializeSearch();
});

// 下拉导航初始化 - Dropdown Navigation Initialization
function initializeDropdownNavigation() {
    const dropdownNavs = document.querySelectorAll('.dropdown-nav');
    
    dropdownNavs.forEach(nav => {
        const trigger = nav.querySelector('.nav-trigger');
        const dropdown = nav.querySelector('.nav-dropdown');
        const arrow = nav.querySelector('.nav-arrow');
        
        if (!trigger || !dropdown) return;
        
        let hoverTimeout;
        let isOpen = false;
        
        // 鼠标进入触发器 - Mouse enter trigger
        trigger.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            openDropdown(nav, trigger, dropdown, arrow);
        });
        
        // 鼠标进入下拉菜单 - Mouse enter dropdown
        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
        });
        
        // 鼠标离开导航项 - Mouse leave nav item
        nav.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                closeDropdown(nav, trigger, dropdown, arrow);
            }, 150); // 150ms 延迟，防止意外关闭
        });
        
        // 键盘支持 - Keyboard support
        trigger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (isOpen) {
                    closeDropdown(nav, trigger, dropdown, arrow);
                } else {
                    openDropdown(nav, trigger, dropdown, arrow);
                }
            }
            
            if (e.key === 'Escape') {
                closeDropdown(nav, trigger, dropdown, arrow);
            }
        });
        
        // 点击外部关闭 - Click outside to close
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target)) {
                closeDropdown(nav, trigger, dropdown, arrow);
            }
        });
        
        // 更新 isOpen 状态 - Update isOpen state
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    isOpen = nav.classList.contains('active');
                }
            });
        });
        
        observer.observe(nav, { attributes: true });
    });
}

// 打开下拉菜单 - Open Dropdown
function openDropdown(nav, trigger, dropdown, arrow) {
    // 关闭其他所有下拉菜单 - Close all other dropdowns
    document.querySelectorAll('.dropdown-nav.active').forEach(otherNav => {
        if (otherNav !== nav) {
            closeDropdown(
                otherNav,
                otherNav.querySelector('.nav-trigger'),
                otherNav.querySelector('.nav-dropdown'),
                otherNav.querySelector('.nav-arrow')
            );
        }
    });
    
    // 打开当前下拉菜单 - Open current dropdown
    nav.classList.add('active');
    trigger.setAttribute('aria-expanded', 'true');
    
    // 箭头动画 - Arrow animation
    if (arrow) {
        arrow.style.transform = 'rotate(180deg)';
        arrow.style.opacity = '1';
    }
    
    // 下拉菜单动画 - Dropdown animation
    dropdown.style.opacity = '0';
    dropdown.style.visibility = 'visible';
    dropdown.style.transform = 'translateX(-50%) translateY(-10px)';
    
    // 用户菜单特殊处理 - Special handling for user menu
    if (nav.dataset.dropdown === 'user') {
        dropdown.style.transform = 'translateY(-10px)';
    }
    
    // 强制重绘后应用最终状态 - Force repaint then apply final state
    requestAnimationFrame(() => {
        dropdown.style.opacity = '1';
        if (nav.dataset.dropdown === 'user') {
            dropdown.style.transform = 'translateY(0)';
        } else {
            dropdown.style.transform = 'translateX(-50%) translateY(0)';
        }
    });
    
    // 添加焦点管理 - Add focus management
    const firstLink = dropdown.querySelector('.dropdown-link');
    if (firstLink) {
        firstLink.focus();
    }
}

// 关闭下拉菜单 - Close Dropdown
function closeDropdown(nav, trigger, dropdown, arrow) {
    nav.classList.remove('active');
    trigger.setAttribute('aria-expanded', 'false');
    
    // 箭头动画 - Arrow animation
    if (arrow) {
        arrow.style.transform = 'rotate(0deg)';
        arrow.style.opacity = '0.6';
    }
    
    // 下拉菜单动画 - Dropdown animation
    dropdown.style.opacity = '0';
    
    if (nav.dataset.dropdown === 'user') {
        dropdown.style.transform = 'translateY(-10px)';
    } else {
        dropdown.style.transform = 'translateX(-50%) translateY(-10px)';
    }
    
    // 延迟隐藏 - Delayed hide
    setTimeout(() => {
        if (!nav.classList.contains('active')) {
            dropdown.style.visibility = 'hidden';
        }
    }, 300);
}

// 主题切换初始化 - Theme Toggle Initialization
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const darkIcon = themeToggle?.querySelector('.dark-icon');
    const lightIcon = themeToggle?.querySelector('.light-icon');
    
    if (!themeToggle) return;
    
    // 初始化主题 - Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    updateThemeIcons(savedTheme, darkIcon, lightIcon);
    
    // 主题切换事件 - Theme toggle event
    themeToggle.addEventListener('click', function() {
        const isDark = document.documentElement.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme, darkIcon, lightIcon);
        
        // 通知其他组件主题已更改 - Notify other components theme changed
        document.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: newTheme } 
        }));
    });
}

// 更新主题图标 - Update Theme Icons
function updateThemeIcons(theme, darkIcon, lightIcon) {
    if (!darkIcon || !lightIcon) return;
    
    if (theme === 'dark') {
        darkIcon.style.opacity = '1';
        darkIcon.style.transform = 'translate(-50%, -50%) rotate(0deg)';
        lightIcon.style.opacity = '0';
        lightIcon.style.transform = 'translate(-50%, -50%) rotate(-180deg)';
    } else {
        lightIcon.style.opacity = '1';
        lightIcon.style.transform = 'translate(-50%, -50%) rotate(0deg)';
        darkIcon.style.opacity = '0';
        darkIcon.style.transform = 'translate(-50%, -50%) rotate(180deg)';
    }
}

// 搜索功能初始化 - Search Initialization
function initializeSearch() {
    const searchBtn = document.querySelector('.search-btn');
    
    if (!searchBtn) return;
    
    searchBtn.addEventListener('click', function() {
        // 简单的搜索提示 - Simple search prompt
        const searchQuery = prompt('🔍 Search for posts, animations, or tutorials...');
        
        if (searchQuery && searchQuery.trim()) {
            // 这里可以实现真实的搜索功能 - Real search functionality can be implemented here
            console.log('Searching for:', searchQuery);
            
            // 示例：跳转到搜索页面 - Example: redirect to search page
            if (window.location.pathname.includes('/posts')) {
                window.location.href = `/posts?q[title_cont]=${encodeURIComponent(searchQuery)}`;
            } else {
                // 可以实现全站搜索 - Can implement site-wide search
                alert(`Searching for: "${searchQuery}"\n\nThis would normally open a search results page.`);
            }
        }
    });
    
    // 键盘快捷键支持 - Keyboard shortcut support
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K 打开搜索 - Ctrl/Cmd + K to open search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchBtn.click();
        }
    });
}

// 工具函数：防抖 - Utility: Debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：节流 - Utility: Throttle
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
