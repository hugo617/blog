import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="lottie-color-sync"
// 一键换色控制器 - One-click color sync controller
export default class extends Controller {
  static targets = ["colorPicker"]
  static values = { 
    primaryColor: String,
    secondaryColor: String,
    accentColor: String
  }

  connect() {
    this.initializeColorPicker()
  }

  // 初始化颜色选择器 - Initialize color picker
  initializeColorPicker() {
    if (this.hasColorPickerTarget) {
      this.colorPickerTarget.addEventListener('change', (event) => {
        this.updateThemeColors(event.target.value)
      })
    }
  }

  // 更新主题颜色 - Update theme colors
  updateThemeColors(primaryColor) {
    // 生成配色方案 - Generate color scheme
    const colors = this.generateColorScheme(primaryColor)
    
    // 更新 CSS 变量 - Update CSS variables
    this.updateCSSVariables(colors)
    
    // 更新 Lottie 动画颜色 - Update Lottie animation colors
    this.updateLottieColors(colors)
    
    // 保存到本地存储 - Save to localStorage
    localStorage.setItem('customColors', JSON.stringify(colors))
  }

  // 生成配色方案 - Generate color scheme
  generateColorScheme(primaryHex) {
    const primary = this.hexToHsl(primaryHex)
    
    return {
      primary: primaryHex,
      secondary: this.hslToHex({
        h: (primary.h + 60) % 360,
        s: primary.s,
        l: Math.max(primary.l - 10, 20)
      }),
      accent: this.hslToHex({
        h: (primary.h + 180) % 360,
        s: Math.min(primary.s + 20, 100),
        l: Math.min(primary.l + 10, 80)
      })
    }
  }

  // 更新 CSS 变量 - Update CSS variables
  updateCSSVariables(colors) {
    const root = document.documentElement
    
    root.style.setProperty('--accent-primary', colors.primary)
    root.style.setProperty('--accent-secondary', colors.secondary)
    root.style.setProperty('--accent-tertiary', colors.accent)
    
    // 更新渐变 - Update gradients
    const gradient = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
    root.style.setProperty('--accent-gradient', gradient)
  }

  // 更新 Lottie 动画颜色 - Update Lottie animation colors
  updateLottieColors(colors) {
    const lottieController = document.querySelector('[data-controller*="lottie-hero"]')
    if (lottieController && window.Stimulus) {
      const controller = window.Stimulus.getControllerForElementAndIdentifier(lottieController, 'lottie-hero')
      if (controller && controller.animation) {
        try {
          // 使用 Lottie 的 updateDocumentData 方法更新颜色
          controller.animation.renderer.elements.forEach(element => {
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
          
          // 强制重新渲染 - Force re-render
          controller.animation.setCurrentRawFrameValue(controller.animation.currentRawFrame)
        } catch (error) {
          console.warn('Failed to update Lottie colors:', error)
        }
      }
    }
  }

  // 预设颜色方案 - Preset color schemes
  applyPreset(event) {
    const preset = event.params.preset
    const presets = {
      aurora: '#6366f1',
      sunset: '#f59e0b',
      ocean: '#0ea5e9',
      forest: '#10b981',
      purple: '#8b5cf6',
      pink: '#ec4899'
    }
    
    if (presets[preset]) {
      this.updateThemeColors(presets[preset])
      if (this.hasColorPickerTarget) {
        this.colorPickerTarget.value = presets[preset]
      }
    }
  }

  // 重置为默认颜色 - Reset to default colors
  resetColors() {
    localStorage.removeItem('customColors')
    this.updateThemeColors('#6366f1') // 默认 Aurora 颜色
    if (this.hasColorPickerTarget) {
      this.colorPickerTarget.value = '#6366f1'
    }
  }

  // 颜色转换工具函数 - Color conversion utilities
  hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    return { h: h * 360, s: s * 100, l: l * 100 }
  }

  hslToHex({ h, s, l }) {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
    const f = n => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }

  hexToRgbArray(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    return [r, g, b, 1]
  }
}
