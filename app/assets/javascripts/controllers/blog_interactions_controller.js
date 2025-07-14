// Blog Interactions Stimulus Controller
// This controller handles all the interactive features of the AURORA blog design
// Converted from the original JavaScript in index.html to follow Rails conventions

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "menuToggle", "sidebar", "pageWrapper", "header", 
    "navLink", "sidebarLink", "masonryGrid", "masonryItem",
    "workCard", "magneticBtn"
  ]

  connect() {
    console.log("AURORA Blog interactions controller connected")

    // Initialize all components
    this.initializeComponents()

    // Set up event listeners
    this.setupEventListeners()

    // Initialize scroll animations with a delay to ensure images are loaded
    setTimeout(() => {
      this.initScrollAnimations()
      this.init3DTiltEffect()
      this.initMagneticButtons()
      this.initSmoothScrolling()
    }, 100)
  }

  disconnect() {
    // Clean up event listeners when controller is disconnected
    this.removeEventListeners()
  }

  initializeComponents() {
    // Set initial active navigation state
    this.setActiveNavLink('home')
    
    // Initialize header scroll state
    this.updateHeader()
  }

  setupEventListeners() {
    // Sidebar toggle
    if (this.hasMenuToggleTarget) {
      this.menuToggleTarget.addEventListener('click', this.toggleSidebar.bind(this))
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', this.handleOutsideClick.bind(this))
    
    // Header scroll effect with throttling
    this.ticking = false
    window.addEventListener('scroll', this.requestTick.bind(this))
    
    // Keyboard navigation
    document.addEventListener('keydown', this.handleKeydown.bind(this))
    
    // Navigation clicks
    this.navLinkTargets.forEach(link => {
      link.addEventListener('click', this.handleNavClick.bind(this))
    })
    
    this.sidebarLinkTargets.forEach(link => {
      link.addEventListener('click', this.handleNavClick.bind(this))
    })
  }

  removeEventListeners() {
    document.removeEventListener('click', this.handleOutsideClick.bind(this))
    window.removeEventListener('scroll', this.requestTick.bind(this))
    document.removeEventListener('keydown', this.handleKeydown.bind(this))
  }

  // ===== SIDEBAR FUNCTIONALITY =====
  toggleSidebar() {
    if (!this.hasSidebarTarget || !this.hasPageWrapperTarget) return
    
    const isOpen = this.sidebarTarget.classList.contains('open')
    
    this.sidebarTarget.classList.toggle('open')
    this.pageWrapperTarget.classList.toggle('sidebar-open')
    document.body.classList.toggle('sidebar-open')
    
    // Update ARIA attributes
    if (this.hasMenuToggleTarget) {
      this.menuToggleTarget.setAttribute('aria-expanded', !isOpen)
    }
  }

  handleOutsideClick(e) {
    if (this.hasSidebarTarget && 
        this.sidebarTarget.classList.contains('open') && 
        !this.sidebarTarget.contains(e.target) && 
        (!this.hasMenuToggleTarget || !this.menuToggleTarget.contains(e.target))) {
      this.toggleSidebar()
    }
  }

  handleKeydown(e) {
    // Close sidebar with Escape key
    if (e.key === 'Escape' && this.hasSidebarTarget && this.sidebarTarget.classList.contains('open')) {
      this.toggleSidebar()
    }
  }

  // ===== NAVIGATION FUNCTIONALITY =====
  setActiveNavLink(targetPage) {
    // Update top navigation
    this.navLinkTargets.forEach(link => {
      link.classList.remove('active')
      if (link.dataset.page === targetPage) {
        link.classList.add('active')
      }
    })
    
    // Update sidebar navigation
    this.sidebarLinkTargets.forEach(link => {
      link.classList.remove('active')
      if (link.dataset.page === targetPage) {
        link.classList.add('active')
      }
    })
  }

  handleNavClick(e) {
    e.preventDefault()
    const targetPage = e.currentTarget.dataset.page
    
    if (targetPage) {
      this.setActiveNavLink(targetPage)
      
      // Close sidebar if open
      if (this.hasSidebarTarget && this.sidebarTarget.classList.contains('open')) {
        this.toggleSidebar()
      }
      
      // Smooth scroll to section
      const targetSection = document.getElementById(targetPage)
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // ===== HEADER SCROLL EFFECT =====
  updateHeader() {
    if (!this.hasHeaderTarget) return
    
    const currentScrollY = window.scrollY
    
    if (currentScrollY > 100) {
      this.headerTarget.classList.add('scrolled')
    } else {
      this.headerTarget.classList.remove('scrolled')
    }
  }

  requestTick() {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.updateHeader()
        this.ticking = false
      })
      this.ticking = true
    }
  }

  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observe masonry items if they exist
    if (this.hasMasonryItemTarget) {
      this.masonryItemTargets.forEach(item => {
        observer.observe(item)
      })
    }

    // Observe other animated elements
    document.querySelectorAll('.journal-card, .skill-item, .contact-item').forEach(item => {
      observer.observe(item)
    })
  }

  // ===== 3D TILT EFFECT FOR CARDS =====
  init3DTiltEffect() {
    if (!this.hasWorkCardTarget) return

    this.workCardTargets.forEach(card => {
      const inner = card.querySelector('.work-card-inner')
      if (!inner) return

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const { width, height } = rect

        const rotateX = ((y / height) - 0.5) * -10
        const rotateY = ((x / width) - 0.5) * 10

        inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      })

      card.addEventListener('mouseleave', () => {
        inner.style.transform = 'rotateX(0deg) rotateY(0deg)'
      })
    })
  }

  // ===== MAGNETIC BUTTON EFFECT =====
  initMagneticButtons() {
    if (!this.hasMagneticBtnTarget) return

    this.magneticBtnTargets.forEach(btn => {
      const child = btn.querySelector('.magnetic-text')
      if (!child) return

      let animationFrameId = null

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        if (animationFrameId) cancelAnimationFrame(animationFrameId)

        animationFrameId = requestAnimationFrame(() => {
          btn.style.transition = 'none'
          child.style.transition = 'none'
          btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
          child.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
        })
      })

      btn.addEventListener('mouseleave', () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId)

        btn.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
        child.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
        btn.style.transform = 'translate(0, 0)'
        child.style.transform = 'translate(0, 0)'
      })
    })
  }

  // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
  initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      })
    })
  }
}
