// 主题切换监听器 - Theme change listener
document.addEventListener('DOMContentLoaded', () => {
  // 初始化主题 - Initialize theme
  const savedTheme = localStorage.getItem('theme') || 'dark'
  document.documentElement.classList.toggle('dark', savedTheme === 'dark')

  // 监听主题变化 - Listen for theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        const lottieController = document.querySelector('[data-controller*="lottie-hero"]')
        if (lottieController && window.Stimulus) {
          const controller = window.Stimulus.getControllerForElementAndIdentifier(lottieController, 'lottie-hero')
          if (controller && controller.applyTheme) {
            controller.applyTheme()
          }
        }
      }
    })
  })
  
  observer.observe(document.documentElement, { attributes: true })
})
