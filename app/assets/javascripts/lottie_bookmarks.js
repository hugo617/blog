// LottieFiles 书签动画配置 - LottieFiles Bookmarks Animation Configuration
// Configuration for Lottie animations used in bookmarks page

class LottieBookmarks {
  constructor() {
    this.animations = new Map()
    this.isLoaded = false
    this.loadLottie()
  }
  
  // 加载 Lottie 库 - Load Lottie library
  async loadLottie() {
    if (window.lottie) {
      this.isLoaded = true
      return
    }
    
    try {
      // 动态加载 Lottie 库 - Dynamically load Lottie library
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js'
      script.onload = () => {
        this.isLoaded = true
        this.initializeAnimations()
      }
      document.head.appendChild(script)
    } catch (error) {
      console.error('Failed to load Lottie library:', error)
    }
  }
  
  // 初始化动画 - Initialize animations
  initializeAnimations() {
    // 英雄区域动画 - Hero area animation
    this.createHeroAnimation()
    
    // 加载动画 - Loading animation
    this.createLoadingAnimation()
    
    // 空状态动画 - Empty state animation
    this.createEmptyStateAnimation()
    
    // 悬停动画 - Hover animations
    this.setupHoverAnimations()
  }
  
  // 创建英雄区域动画 - Create hero area animation
  createHeroAnimation() {
    const heroElement = document.getElementById('bookmarks-hero-lottie')
    if (!heroElement) return
    
    // 使用内联 Lottie 数据或外部 URL
    // Use inline Lottie data or external URL
    const animationData = this.getBookmarksHeroAnimation()
    
    if (window.lottie) {
      const animation = window.lottie.loadAnimation({
        container: heroElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData
      })
      
      this.animations.set('hero', animation)
    }
  }
  
  // 创建加载动画 - Create loading animation
  createLoadingAnimation() {
    const loadingElement = document.getElementById('bookmarks-loading-lottie')
    if (!loadingElement) return
    
    const animationData = this.getLoadingAnimation()
    
    if (window.lottie) {
      const animation = window.lottie.loadAnimation({
        container: loadingElement,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        animationData: animationData
      })
      
      this.animations.set('loading', animation)
    }
  }
  
  // 创建空状态动画 - Create empty state animation
  createEmptyStateAnimation() {
    const emptyElement = document.getElementById('bookmarks-empty-lottie')
    if (!emptyElement) return
    
    const animationData = this.getEmptyStateAnimation()
    
    if (window.lottie) {
      const animation = window.lottie.loadAnimation({
        container: emptyElement,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        animationData: animationData
      })
      
      this.animations.set('empty', animation)
    }
  }
  
  // 设置悬停动画 - Setup hover animations
  setupHoverAnimations() {
    const bookmarkCards = document.querySelectorAll('.bookmark-card')
    
    bookmarkCards.forEach(card => {
      const animationTrigger = card.querySelector('.bookmark-animation-trigger')
      if (!animationTrigger) return
      
      // 创建微动画容器 - Create micro-animation container
      const microAnimation = document.createElement('div')
      microAnimation.className = 'bookmark-micro-animation'
      animationTrigger.appendChild(microAnimation)
      
      // 悬停时播放动画 - Play animation on hover
      card.addEventListener('mouseenter', () => {
        this.playHoverAnimation(microAnimation)
      })
      
      card.addEventListener('mouseleave', () => {
        this.stopHoverAnimation(microAnimation)
      })
    })
  }
  
  // 播放悬停动画 - Play hover animation
  playHoverAnimation(container) {
    if (!window.lottie) return
    
    const animationData = this.getHoverAnimation()
    
    const animation = window.lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: animationData
    })
    
    // 动画完成后清理 - Cleanup after animation completes
    animation.addEventListener('complete', () => {
      animation.destroy()
    })
  }
  
  // 停止悬停动画 - Stop hover animation
  stopHoverAnimation(container) {
    container.innerHTML = ''
  }
  
  // 获取书签英雄动画数据 - Get bookmarks hero animation data
  getBookmarksHeroAnimation() {
    // 简化的书签收藏动画 - Simplified bookmark collection animation
    return {
      "v": "5.7.4",
      "fr": 30,
      "ip": 0,
      "op": 90,
      "w": 300,
      "h": 200,
      "nm": "Bookmarks Hero",
      "ddd": 0,
      "assets": [],
      "layers": [
        {
          "ddd": 0,
          "ind": 1,
          "ty": 4,
          "nm": "Bookmark 1",
          "sr": 1,
          "ks": {
            "o": {"a": 0, "k": 100},
            "r": {"a": 1, "k": [
              {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [0]},
              {"t": 45, "s": [360]}
            ]},
            "p": {"a": 0, "k": [150, 100]},
            "a": {"a": 0, "k": [0, 0]},
            "s": {"a": 1, "k": [
              {"i": {"x": [0.833, 0.833], "y": [0.833, 0.833]}, "o": {"x": [0.167, 0.167], "y": [0.167, 0.167]}, "t": 0, "s": [100, 100]},
              {"i": {"x": [0.833, 0.833], "y": [0.833, 0.833]}, "o": {"x": [0.167, 0.167], "y": [0.167, 0.167]}, "t": 22, "s": [120, 120]},
              {"t": 45, "s": [100, 100]}
            ]}
          },
          "ao": 0,
          "shapes": [
            {
              "ty": "gr",
              "it": [
                {
                  "ty": "rc",
                  "d": 1,
                  "s": {"a": 0, "k": [60, 80]},
                  "p": {"a": 0, "k": [0, 0]},
                  "r": {"a": 0, "k": 8}
                },
                {
                  "ty": "fl",
                  "c": {"a": 0, "k": [0.388, 0.4, 0.945, 1]},
                  "o": {"a": 0, "k": 100}
                }
              ]
            }
          ],
          "ip": 0,
          "op": 90,
          "st": 0
        }
      ]
    }
  }
  
  // 获取加载动画数据 - Get loading animation data
  getLoadingAnimation() {
    return {
      "v": "5.7.4",
      "fr": 30,
      "ip": 0,
      "op": 60,
      "w": 100,
      "h": 100,
      "nm": "Loading",
      "ddd": 0,
      "assets": [],
      "layers": [
        {
          "ddd": 0,
          "ind": 1,
          "ty": 4,
          "nm": "Spinner",
          "sr": 1,
          "ks": {
            "o": {"a": 0, "k": 100},
            "r": {"a": 1, "k": [
              {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [0]},
              {"t": 60, "s": [360]}
            ]},
            "p": {"a": 0, "k": [50, 50]},
            "a": {"a": 0, "k": [0, 0]},
            "s": {"a": 0, "k": [100, 100]}
          },
          "ao": 0,
          "shapes": [
            {
              "ty": "gr",
              "it": [
                {
                  "ty": "el",
                  "d": 1,
                  "s": {"a": 0, "k": [40, 40]},
                  "p": {"a": 0, "k": [0, 0]}
                },
                {
                  "ty": "st",
                  "c": {"a": 0, "k": [0.388, 0.4, 0.945, 1]},
                  "o": {"a": 0, "k": 100},
                  "w": {"a": 0, "k": 4},
                  "lc": 2,
                  "lj": 2
                }
              ]
            }
          ],
          "ip": 0,
          "op": 60,
          "st": 0
        }
      ]
    }
  }
  
  // 获取空状态动画数据 - Get empty state animation data
  getEmptyStateAnimation() {
    return {
      "v": "5.7.4",
      "fr": 30,
      "ip": 0,
      "op": 120,
      "w": 200,
      "h": 200,
      "nm": "Empty State",
      "ddd": 0,
      "assets": [],
      "layers": [
        {
          "ddd": 0,
          "ind": 1,
          "ty": 4,
          "nm": "Search Icon",
          "sr": 1,
          "ks": {
            "o": {"a": 1, "k": [
              {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [50]},
              {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 60, "s": [100]},
              {"t": 120, "s": [50]}
            ]},
            "r": {"a": 0, "k": 0},
            "p": {"a": 0, "k": [100, 100]},
            "a": {"a": 0, "k": [0, 0]},
            "s": {"a": 1, "k": [
              {"i": {"x": [0.833, 0.833], "y": [0.833, 0.833]}, "o": {"x": [0.167, 0.167], "y": [0.167, 0.167]}, "t": 0, "s": [80, 80]},
              {"i": {"x": [0.833, 0.833], "y": [0.833, 0.833]}, "o": {"x": [0.167, 0.167], "y": [0.167, 0.167]}, "t": 60, "s": [100, 100]},
              {"t": 120, "s": [80, 80]}
            ]}
          },
          "ao": 0,
          "shapes": [
            {
              "ty": "gr",
              "it": [
                {
                  "ty": "el",
                  "d": 1,
                  "s": {"a": 0, "k": [50, 50]},
                  "p": {"a": 0, "k": [0, 0]}
                },
                {
                  "ty": "st",
                  "c": {"a": 0, "k": [0.6, 0.6, 0.6, 1]},
                  "o": {"a": 0, "k": 100},
                  "w": {"a": 0, "k": 3},
                  "lc": 2,
                  "lj": 2
                }
              ]
            }
          ],
          "ip": 0,
          "op": 120,
          "st": 0
        }
      ]
    }
  }
  
  // 获取悬停动画数据 - Get hover animation data
  getHoverAnimation() {
    return {
      "v": "5.7.4",
      "fr": 30,
      "ip": 0,
      "op": 30,
      "w": 50,
      "h": 50,
      "nm": "Hover Effect",
      "ddd": 0,
      "assets": [],
      "layers": [
        {
          "ddd": 0,
          "ind": 1,
          "ty": 4,
          "nm": "Sparkle",
          "sr": 1,
          "ks": {
            "o": {"a": 1, "k": [
              {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [0]},
              {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 15, "s": [100]},
              {"t": 30, "s": [0]}
            ]},
            "r": {"a": 1, "k": [
              {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [0]},
              {"t": 30, "s": [180]}
            ]},
            "p": {"a": 0, "k": [25, 25]},
            "a": {"a": 0, "k": [0, 0]},
            "s": {"a": 1, "k": [
              {"i": {"x": [0.833, 0.833], "y": [0.833, 0.833]}, "o": {"x": [0.167, 0.167], "y": [0.167, 0.167]}, "t": 0, "s": [50, 50]},
              {"i": {"x": [0.833, 0.833], "y": [0.833, 0.833]}, "o": {"x": [0.167, 0.167], "y": [0.167, 0.167]}, "t": 15, "s": [100, 100]},
              {"t": 30, "s": [50, 50]}
            ]}
          },
          "ao": 0,
          "shapes": [
            {
              "ty": "gr",
              "it": [
                {
                  "ty": "sr",
                  "d": 1,
                  "pt": {"a": 0, "k": 4},
                  "p": {"a": 0, "k": [0, 0]},
                  "r": {"a": 0, "k": 0},
                  "ir": {"a": 0, "k": 5},
                  "or": {"a": 0, "k": 15}
                },
                {
                  "ty": "fl",
                  "c": {"a": 0, "k": [1, 0.8, 0.2, 1]},
                  "o": {"a": 0, "k": 100}
                }
              ]
            }
          ],
          "ip": 0,
          "op": 30,
          "st": 0
        }
      ]
    }
  }
  
  // 播放动画 - Play animation
  play(name) {
    const animation = this.animations.get(name)
    if (animation) {
      animation.play()
    }
  }
  
  // 停止动画 - Stop animation
  stop(name) {
    const animation = this.animations.get(name)
    if (animation) {
      animation.stop()
    }
  }
  
  // 暂停动画 - Pause animation
  pause(name) {
    const animation = this.animations.get(name)
    if (animation) {
      animation.pause()
    }
  }
  
  // 销毁所有动画 - Destroy all animations
  destroy() {
    this.animations.forEach(animation => {
      animation.destroy()
    })
    this.animations.clear()
  }
}

// 全局实例 - Global instance
window.LottieBookmarks = new LottieBookmarks()

// 页面加载完成后初始化 - Initialize after page load
document.addEventListener('DOMContentLoaded', () => {
  if (window.LottieBookmarks && !window.LottieBookmarks.isLoaded) {
    window.LottieBookmarks.loadLottie()
  }
})
