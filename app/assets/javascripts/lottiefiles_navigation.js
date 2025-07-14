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

    // 初始化语言选择器 - Initialize language selector
    initializeLanguageSelector();
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
    const searchContainer = document.querySelector('[data-search-container]');
    const searchInput = document.querySelector('[data-search-input]');
    const searchFilter = document.querySelector('[data-search-filter]');
    const searchDropdown = document.querySelector('[data-search-dropdown]');

    if (!searchContainer || !searchInput) return;

    let isSearchFocused = false;
    let isDropdownOpen = false;

    // 搜索输入框聚焦 - Search input focus
    function focusSearch() {
        isSearchFocused = true;
        searchContainer.classList.add('focused');
        showSearchDropdown();
    }

    // 搜索输入框失焦 - Search input blur
    function blurSearch() {
        // 延迟失焦，允许点击下拉菜单
        setTimeout(() => {
            if (!isDropdownOpen) {
                isSearchFocused = false;
                searchContainer.classList.remove('focused');
                hideSearchDropdown();
            }
        }, 150);
    }

    // 显示搜索下拉菜单 - Show search dropdown
    function showSearchDropdown() {
        isDropdownOpen = true;
        searchContainer.classList.add('active');
    }

    // 隐藏搜索下拉菜单 - Hide search dropdown
    function hideSearchDropdown() {
        isDropdownOpen = false;
        searchContainer.classList.remove('active');
    }

    // 搜索输入框事件 - Search input events
    searchInput.addEventListener('focus', focusSearch);
    searchInput.addEventListener('blur', blurSearch);

    // 搜索过滤器点击 - Search filter click
    if (searchFilter) {
        searchFilter.addEventListener('click', function(e) {
            e.preventDefault();
            searchFilter.classList.toggle('active');
            // 这里可以实现过滤器下拉菜单
            console.log('Filter clicked');
        });
    }

    // 搜索下拉菜单鼠标事件 - Search dropdown mouse events
    if (searchDropdown) {
        searchDropdown.addEventListener('mouseenter', function() {
            isDropdownOpen = true;
        });

        searchDropdown.addEventListener('mouseleave', function() {
            if (!isSearchFocused) {
                hideSearchDropdown();
            }
        });
    }

    // 搜索输入处理 - Search input handling
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.trim();

            if (query.length > 0) {
                performSearch(query);
            } else {
                showDefaultResults();
            }
        });
    }

    // 键盘快捷键支持 - Keyboard shortcut support
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K 聚焦搜索 - Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }

        // ESC 关闭搜索下拉 - ESC to close search dropdown
        if (e.key === 'Escape' && isDropdownOpen) {
            hideSearchDropdown();
            searchInput.blur();
        }
    });

    // 点击外部关闭 - Click outside to close
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target)) {
            hideSearchDropdown();
        }
    });

    // 执行搜索 - Perform search
    function performSearch(query) {
        // 模拟搜索结果 - Simulate search results
        const mockResults = [
            {
                type: 'Posts',
                items: [
                    {
                        icon: '📝',
                        title: `"${query}" in Blog Posts`,
                        desc: 'Search through all blog articles',
                        url: `/posts?q[title_cont]=${encodeURIComponent(query)}`
                    }
                ]
            },
            {
                type: 'Pages',
                items: [
                    {
                        icon: '🏠',
                        title: 'Home Page',
                        desc: 'Main landing page',
                        url: '/'
                    },
                    {
                        icon: '📞',
                        title: 'Contact',
                        desc: 'Get in touch with us',
                        url: '#contact'
                    }
                ]
            }
        ];

        displaySearchResults(mockResults);
    }

    // 显示默认结果 - Show default results
    function showDefaultResults() {
        // 恢复默认的搜索建议 - Restore default search suggestions
        // 这里可以显示热门搜索、最近搜索等
    }

    // 显示搜索结果 - Display search results
    function displaySearchResults(results) {
        if (!searchResults) return;

        const html = results.map(section => `
            <div class="search-section">
                <div class="search-section-title">${section.type}</div>
                <div class="search-items">
                    ${section.items.map(item => `
                        <a href="${item.url}" class="search-item" data-search-item>
                            <div class="search-item-icon">${item.icon}</div>
                            <div class="search-item-content">
                                <div class="search-item-title">${item.title}</div>
                                <div class="search-item-desc">${item.desc}</div>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = html;
    }

    // 导航搜索结果 - Navigate search results
    let currentSearchIndex = -1;

    function navigateSearchResults(direction) {
        const items = searchResults.querySelectorAll('[data-search-item]');
        if (items.length === 0) return;

        // 移除当前高亮 - Remove current highlight
        if (currentSearchIndex >= 0 && items[currentSearchIndex]) {
            items[currentSearchIndex].classList.remove('highlighted');
        }

        // 计算新索引 - Calculate new index
        currentSearchIndex += direction;
        if (currentSearchIndex < 0) currentSearchIndex = items.length - 1;
        if (currentSearchIndex >= items.length) currentSearchIndex = 0;

        // 添加新高亮 - Add new highlight
        if (items[currentSearchIndex]) {
            items[currentSearchIndex].classList.add('highlighted');
            items[currentSearchIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    // 选择当前搜索结果 - Select current search result
    function selectCurrentSearchResult() {
        const items = searchResults.querySelectorAll('[data-search-item]');
        if (currentSearchIndex >= 0 && items[currentSearchIndex]) {
            items[currentSearchIndex].click();
        }
    }
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

// 语言选择器初始化 - Language Selector Initialization
function initializeLanguageSelector() {
    const languageSelector = document.querySelector('[data-language-selector]');

    if (!languageSelector) return;

    const trigger = languageSelector.querySelector('.language-trigger-lottie');
    const dropdown = languageSelector.querySelector('.language-dropdown-lottie');
    const currentLang = languageSelector.querySelector('[data-current-lang]');
    const options = languageSelector.querySelectorAll('.language-option-lottie');

    let isOpen = false;
    let hoverTimeout;

    // 打开语言选择器 - Open language selector
    function openLanguageSelector() {
        isOpen = true;
        languageSelector.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
    }

    // 关闭语言选择器 - Close language selector
    function closeLanguageSelector() {
        isOpen = false;
        languageSelector.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
    }

    // 鼠标进入触发器 - Mouse enter trigger
    trigger.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
        openLanguageSelector();
    });

    // 鼠标进入下拉菜单 - Mouse enter dropdown
    dropdown.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
    });

    // 鼠标离开选择器 - Mouse leave selector
    languageSelector.addEventListener('mouseleave', function() {
        hoverTimeout = setTimeout(() => {
            closeLanguageSelector();
        }, 150);
    });

    // 点击触发器 - Click trigger
    trigger.addEventListener('click', function(e) {
        e.preventDefault();
        if (isOpen) {
            closeLanguageSelector();
        } else {
            openLanguageSelector();
        }
    });

    // 语言选项点击 - Language option click
    options.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();

            const lang = this.dataset.lang;
            const langName = this.querySelector('.language-option-name').textContent;

            // 更新当前语言显示 - Update current language display
            if (currentLang) {
                currentLang.textContent = lang.toUpperCase();
            }

            // 更新活跃状态 - Update active state
            options.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');

            // 关闭下拉菜单 - Close dropdown
            closeLanguageSelector();

            // 这里可以实现语言切换逻辑 - Language switching logic can be implemented here
            console.log('Language changed to:', lang, langName);

            // 示例：重新加载页面并设置语言参数 - Example: reload page with language parameter
            const url = new URL(window.location);
            url.searchParams.set('locale', lang);
            window.location.href = url.toString();
        });
    });

    // 点击外部关闭 - Click outside to close
    document.addEventListener('click', function(e) {
        if (!languageSelector.contains(e.target)) {
            closeLanguageSelector();
        }
    });

    // 键盘支持 - Keyboard support
    trigger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (isOpen) {
                closeLanguageSelector();
            } else {
                openLanguageSelector();
            }
        }

        if (e.key === 'Escape') {
            closeLanguageSelector();
        }
    });

    // 初始化当前语言 - Initialize current language
    const urlParams = new URLSearchParams(window.location.search);
    const currentLocale = urlParams.get('locale') || 'en';

    // 设置当前语言显示 - Set current language display
    if (currentLang) {
        currentLang.textContent = currentLocale.toUpperCase();
    }

    // 设置活跃选项 - Set active option
    options.forEach(option => {
        if (option.dataset.lang === currentLocale) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
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
