import { Controller } from "@hotwired/stimulus"
import lottie from "lottie-web"

// Connects to data-controller="lottie-hero"
export default class extends Controller {
  static targets = ["container"]
  static values = { 
    animationUrl: String,
    theme: String
  }

  connect() {
    // 检测用户偏好设置 - Check user motion preferences
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // 检测移动设备 - Detect mobile devices
    this.isMobile = window.innerWidth < 768
    
    if (this.reducedMotion || this.isMobile) {
      this.showStaticFallback()
      return
    }

    this.setupLazyLoad()
    this.setupInteractions()
  }

  disconnect() {
    if (this.animation) {
      this.animation.destroy()
    }
    if (this.mouseMoveHandler) {
      document.removeEventListener('pointermove', this.mouseMoveHandler)
    }
  }

  // 懒加载动画 - Lazy load animation
  setupLazyLoad() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadAnimation()
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    observer.observe(this.containerTarget)
  }

  loadAnimation() {
    try {
      this.animation = lottie.loadAnimation({
        container: this.containerTarget,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: this.animationUrlValue,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
          progressiveLoad: true,
          hideOnTransparent: true
        }
      })

      // 动画加载完成后的回调
      this.animation.addEventListener('DOMLoaded', () => {
        this.containerTarget.style.opacity = '1'
        this.containerTarget.style.transition = 'opacity 0.5s ease'
        this.applyTheme()
      })

    } catch (error) {
      console.warn('Lottie animation failed to load:', error)
      this.showStaticFallback()
    }
  }

  // 设置鼠标交互 - Setup mouse interactions
  setupInteractions() {
    let lastTime = 0
    const throttleMs = 16 // 60fps
    let mouseX = 0, mouseY = 0

    this.mouseMoveHandler = (event) => {
      const now = Date.now()
      if (now - lastTime < throttleMs) return
      lastTime = now

      const rect = this.containerTarget.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = event.clientX - centerX
      const deltaY = event.clientY - centerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      // 15px 范围内粒子跟随 - Particle following within 15px range
      if (distance < 150 && this.animation?.isLoaded) {
        const progress = Math.min(distance / 150, 1)
        const frame = Math.floor(this.animation.totalFrames * progress * 0.3)
        this.animation.goToAndStop(frame, true)
      }
    }

    document.addEventListener('pointermove', this.mouseMoveHandler, { passive: true })
  }

  // 应用主题 - Apply theme
  applyTheme() {
    if (!this.animation) return
    
    const isDark = document.documentElement.classList.contains('dark')
    const colors = isDark ? 
      { primary: '#6366f1', secondary: '#a855f7', accent: '#06b6d4' } :
      { primary: '#3b82f6', secondary: '#8b5cf6', accent: '#10b981' }

    try {
      // 尝试更新动画颜色 - Try to update animation colors
      this.animation.renderer.elements.forEach(element => {
        if (element.data?.shapes) {
          element.data.shapes.forEach(shape => {
            if (shape.it) {
              shape.it.forEach(item => {
                if (item.c?.k) {
                  item.c.k = this.hexToRgbArray(colors.primary)
                }
              })
            }
          })
        }
      })
    } catch (e) {
      console.warn('Theme update failed:', e)
    }
  }

  // 十六进制转RGB数组 - Convert hex to RGB array
  hexToRgbArray(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255  
    const b = parseInt(hex.slice(5, 7), 16) / 255
    return [r, g, b, 1]
  }

  // 静态图片降级 - Static image fallback
  showStaticFallback() {
    this.containerTarget.innerHTML = `
      <div class="hero-static-bg">
        <div class="gradient-orb"></div>
        <div class="gradient-orb secondary"></div>
      </div>
    `
    this.containerTarget.style.opacity = '1'
  }

  // 主题值变化时的回调 - Theme value change callback
  themeValueChanged() {
    this.applyTheme()
  }
}
