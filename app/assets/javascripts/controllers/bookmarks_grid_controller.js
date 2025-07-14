// 书签网格控制器 - Bookmarks Grid Controller
// Stimulus controller for managing bookmarks grid interactions
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "grid", "searchInput", "searchBox", "searchClear", "searchInfo", "searchCount",
    "categoryFilters", "sortSelect", "loading", "emptyState", "loadMore",
    "modal", "modalBody", "totalCount"
  ]
  
  static values = {
    featured: Boolean,
    currentOffset: Number,
    currentQuery: String,
    currentCategory: String,
    currentSort: String,
    totalCount: Number
  }
  
  connect() {
    console.log("BookmarksGrid controller connected")
    
    // 初始化值 - Initialize values
    this.currentOffsetValue = 0
    this.currentQueryValue = this.searchInputTarget.value || ""
    this.currentCategoryValue = "all"
    this.currentSortValue = "recent"
    this.totalCountValue = parseInt(this.totalCountTarget.textContent) || 0
    
    // 初始化动画 - Initialize animations
    this.initializeLottieAnimations()
    
    // 初始化网格动画 - Initialize grid animations
    this.animateGridItems()
    
    // 设置搜索防抖 - Setup search debouncing
    this.searchDebounceTimer = null
    
    // 更新搜索信息 - Update search info
    this.updateSearchInfo()
    
    // 绑定键盘事件 - Bind keyboard events
    this.bindKeyboardEvents()
  }
  
  disconnect() {
    // 清理定时器 - Cleanup timers
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer)
    }
    
    // 清理 Lottie 动画 - Cleanup Lottie animations
    this.cleanupLottieAnimations()
  }
  
  // 初始化 Lottie 动画 - Initialize Lottie animations
  initializeLottieAnimations() {
    // 英雄区域动画 - Hero area animation
    const heroElement = document.getElementById('bookmarks-hero-lottie')
    if (heroElement && window.lottie) {
      this.heroAnimation = window.lottie.loadAnimation({
        container: heroElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/assets/animations/bookmarks-hero.json' // 需要添加动画文件
      })
    }
    
    // 加载动画 - Loading animation
    const loadingElement = document.getElementById('bookmarks-loading-lottie')
    if (loadingElement && window.lottie) {
      this.loadingAnimation = window.lottie.loadAnimation({
        container: loadingElement,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '/assets/animations/loading-bookmarks.json'
      })
    }
    
    // 空状态动画 - Empty state animation
    const emptyElement = document.getElementById('bookmarks-empty-lottie')
    if (emptyElement && window.lottie) {
      this.emptyAnimation = window.lottie.loadAnimation({
        container: emptyElement,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        path: '/assets/animations/empty-search.json'
      })
    }
  }
  
  // 清理 Lottie 动画 - Cleanup Lottie animations
  cleanupLottieAnimations() {
    if (this.heroAnimation) this.heroAnimation.destroy()
    if (this.loadingAnimation) this.loadingAnimation.destroy()
    if (this.emptyAnimation) this.emptyAnimation.destroy()
  }
  
  // 网格项目动画 - Grid items animation
  animateGridItems() {
    const cards = this.gridTarget.querySelectorAll('.bookmark-card')
    
    cards.forEach((card, index) => {
      const delay = parseFloat(card.dataset.animationDelay) || 0
      
      // 设置初始状态 - Set initial state
      card.style.opacity = '0'
      card.style.transform = 'translateY(30px) scale(0.95)'
      
      // 延迟动画 - Delayed animation
      setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        card.style.opacity = '1'
        card.style.transform = 'translateY(0) scale(1)'
      }, delay * 1000)
    })
  }
  
  // 搜索功能 - Search functionality
  search(event) {
    const query = event.target.value.trim()
    
    // 清除之前的定时器 - Clear previous timer
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer)
    }
    
    // 设置防抖 - Setup debouncing
    this.searchDebounceTimer = setTimeout(() => {
      this.performSearch(query)
    }, 300)
  }
  
  // 执行搜索 - Perform search
  performSearch(query) {
    this.currentQueryValue = query
    this.currentOffsetValue = 0
    
    // 更新搜索清除按钮显示 - Update search clear button visibility
    this.updateSearchClearButton()
    
    // 如果是空搜索，显示所有项目 - If empty search, show all items
    if (!query) {
      this.showAllItems()
      this.updateSearchInfo()
      return
    }
    
    // 执行客户端搜索 - Perform client-side search
    this.filterItems(query)
    this.updateSearchInfo()
  }
  
  // 过滤项目 - Filter items
  filterItems(query) {
    const cards = this.gridTarget.querySelectorAll('.bookmark-card')
    let visibleCount = 0
    
    cards.forEach(card => {
      const title = card.dataset.title || ''
      const description = card.dataset.description || ''
      const tags = card.dataset.tags || ''
      const category = card.dataset.category || ''
      
      const searchText = `${title} ${description} ${tags} ${category}`.toLowerCase()
      const isMatch = searchText.includes(query.toLowerCase())
      
      if (isMatch && this.matchesCurrentCategory(card)) {
        this.showCard(card)
        visibleCount++
      } else {
        this.hideCard(card)
      }
    })
    
    // 显示/隐藏空状态 - Show/hide empty state
    this.toggleEmptyState(visibleCount === 0)
  }
  
  // 显示所有项目 - Show all items
  showAllItems() {
    const cards = this.gridTarget.querySelectorAll('.bookmark-card')
    let visibleCount = 0
    
    cards.forEach(card => {
      if (this.matchesCurrentCategory(card)) {
        this.showCard(card)
        visibleCount++
      } else {
        this.hideCard(card)
      }
    })
    
    this.toggleEmptyState(visibleCount === 0)
  }
  
  // 检查是否匹配当前分类 - Check if matches current category
  matchesCurrentCategory(card) {
    if (this.currentCategoryValue === 'all') return true
    return card.dataset.category === this.currentCategoryValue
  }
  
  // 显示卡片 - Show card
  showCard(card) {
    card.style.display = 'block'
    card.style.opacity = '1'
    card.style.transform = 'scale(1)'
    card.classList.remove('filtered-out')
  }
  
  // 隐藏卡片 - Hide card
  hideCard(card) {
    card.style.opacity = '0.3'
    card.style.transform = 'scale(0.95)'
    card.classList.add('filtered-out')
    
    setTimeout(() => {
      if (card.classList.contains('filtered-out')) {
        card.style.display = 'none'
      }
    }, 300)
  }
  
  // 分类过滤 - Category filtering
  filterByCategory(event) {
    const category = event.target.dataset.category
    this.currentCategoryValue = category
    
    // 更新活动按钮 - Update active button
    this.categoryFiltersTarget.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active')
    })
    event.target.classList.add('active')
    
    // 重新应用过滤 - Reapply filtering
    if (this.currentQueryValue) {
      this.filterItems(this.currentQueryValue)
    } else {
      this.showAllItems()
    }
    
    this.updateSearchInfo()
  }
  
  // 排序 - Sorting
  sort(event) {
    this.currentSortValue = event.target.value
    // 这里可以实现客户端排序或发送 AJAX 请求
    // Client-side sorting or AJAX request can be implemented here
    console.log(`Sorting by: ${this.currentSortValue}`)
  }
  
  // 清除搜索 - Clear search
  clearSearch() {
    this.searchInputTarget.value = ''
    this.currentQueryValue = ''
    this.showAllItems()
    this.updateSearchClearButton()
    this.updateSearchInfo()
    this.searchInputTarget.focus()
  }
  
  // 更新搜索清除按钮 - Update search clear button
  updateSearchClearButton() {
    if (this.currentQueryValue) {
      this.searchClearTarget.style.display = 'flex'
    } else {
      this.searchClearTarget.style.display = 'none'
    }
  }
  
  // 更新搜索信息 - Update search info
  updateSearchInfo() {
    const visibleCards = this.gridTarget.querySelectorAll('.bookmark-card:not(.filtered-out)')
    const count = visibleCards.length
    
    if (this.currentQueryValue) {
      this.searchCountTarget.textContent = `Found ${count} results for "${this.currentQueryValue}"`
      this.searchInfoTarget.style.display = 'block'
    } else {
      this.searchInfoTarget.style.display = 'none'
    }
  }
  
  // 切换空状态 - Toggle empty state
  toggleEmptyState(show) {
    if (show) {
      this.emptyStateTarget.style.display = 'flex'
      this.gridTarget.style.display = 'none'
      if (this.emptyAnimation) this.emptyAnimation.play()
    } else {
      this.emptyStateTarget.style.display = 'none'
      this.gridTarget.style.display = 'grid'
      if (this.emptyAnimation) this.emptyAnimation.stop()
    }
  }
  
  // 打开书签详情 - Open bookmark details
  openBookmark(event) {
    event.preventDefault()
    const bookmarkId = event.currentTarget.dataset.bookmarkId
    
    // 显示加载状态 - Show loading state
    this.showModal()
    this.modalBodyTarget.innerHTML = '<div class="modal-loading">Loading...</div>'
    
    // 获取书签详情 - Fetch bookmark details
    fetch(`/bookmarks/${bookmarkId}`, {
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(response => response.json())
    .then(data => {
      // 渲染书签详情 - Render bookmark details
      this.renderBookmarkModal(data)
    })
    .catch(error => {
      console.error('Error fetching bookmark:', error)
      this.modalBodyTarget.innerHTML = '<div class="modal-error">Error loading bookmark details</div>'
    })
  }
  
  // 渲染书签模态 - Render bookmark modal
  renderBookmarkModal(bookmark) {
    // 这里应该渲染书签详情模板
    // Bookmark details template should be rendered here
    this.modalBodyTarget.innerHTML = `
      <div class="bookmark-modal-content">
        <h2>${bookmark.title}</h2>
        <p>${bookmark.description}</p>
        <a href="${bookmark.url}" target="_blank" class="btn-primary">Visit Website</a>
      </div>
    `
  }
  
  // 显示模态 - Show modal
  showModal() {
    this.modalTarget.classList.add('active')
    document.body.style.overflow = 'hidden'
  }
  
  // 关闭模态 - Close modal
  closeModal() {
    this.modalTarget.classList.remove('active')
    document.body.style.overflow = ''
  }
  
  // 阻止事件冒泡 - Stop event propagation
  stopPropagation(event) {
    event.stopPropagation()
  }
  
  // 访问网站 - Visit site
  visitSite(event) {
    event.stopPropagation()
    const url = event.currentTarget.dataset.url
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  
  // 绑定键盘事件 - Bind keyboard events
  bindKeyboardEvents() {
    document.addEventListener('keydown', (event) => {
      // ESC 关闭模态 - ESC to close modal
      if (event.key === 'Escape' && this.modalTarget.classList.contains('active')) {
        this.closeModal()
      }
      
      // Ctrl/Cmd + K 聚焦搜索 - Ctrl/Cmd + K to focus search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        this.searchInputTarget.focus()
      }
    })
  }
  
  // 加载更多 - Load more
  loadMore() {
    this.currentOffsetValue += 20
    // 实现加载更多逻辑 - Implement load more logic
    console.log(`Loading more from offset: ${this.currentOffsetValue}`)
  }
  
  // 增加浏览次数 - Increment views
  incrementViews(event) {
    const bookmarkId = event.currentTarget.dataset.bookmarkId
    
    fetch(`/bookmarks/${bookmarkId}/increment_views`, {
      method: 'PATCH',
      headers: {
        'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // 更新浏览次数显示 - Update views count display
      const viewsElement = document.querySelector(`[data-bookmark-views="${bookmarkId}"]`)
      if (viewsElement) {
        viewsElement.textContent = data.views_count
      }
    })
    .catch(error => console.error('Error incrementing views:', error))
  }
  
  // 切换点赞 - Toggle like
  toggleLike(event) {
    event.preventDefault()
    const bookmarkId = event.currentTarget.dataset.bookmarkId
    
    fetch(`/bookmarks/${bookmarkId}/toggle_like`, {
      method: 'PATCH',
      headers: {
        'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // 更新点赞次数显示 - Update likes count display
      const likesElement = document.querySelector(`[data-bookmark-likes="${bookmarkId}"]`)
      if (likesElement) {
        likesElement.textContent = data.likes_count
      }
    })
    .catch(error => console.error('Error toggling like:', error))
  }
  
  // 分享书签 - Share bookmark
  shareBookmark(event) {
    event.preventDefault()
    const bookmarkId = event.currentTarget.dataset.bookmarkId
    
    if (navigator.share) {
      navigator.share({
        title: 'Check out this bookmark',
        url: window.location.href
      })
    } else {
      // 复制到剪贴板 - Copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }
}
