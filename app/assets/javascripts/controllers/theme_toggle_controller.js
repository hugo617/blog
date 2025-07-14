import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="theme-toggle"
export default class extends Controller {
  connect() {
    this.updateTheme()
  }

  toggle() {
    const isDark = document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', !isDark)
    localStorage.setItem('theme', isDark ? 'light' : 'dark')
    this.updateTheme()
    
    // 通知 Lottie 动画更新主题 - Notify Lottie animation to update theme
    this.notifyLottieThemeChange()
  }

  updateTheme() {
    const theme = localStorage.getItem('theme') || 'dark'
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }

  notifyLottieThemeChange() {
    const lottieController = document.querySelector('[data-controller*="lottie-hero"]')
    if (lottieController && window.Stimulus) {
      const controller = window.Stimulus.getControllerForElementAndIdentifier(lottieController, 'lottie-hero')
      if (controller && controller.applyTheme) {
        controller.applyTheme()
      }
    }
  }
}
