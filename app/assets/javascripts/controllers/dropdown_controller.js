import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dropdown"
export default class extends Controller {
  static targets = ["menu"]

  connect() {
    this.close = this.close.bind(this)
  }

  toggle(event) {
    event.preventDefault()
    event.stopPropagation()
    
    if (this.menuTarget.classList.contains('show')) {
      this.close()
    } else {
      this.open()
    }
  }

  open() {
    this.menuTarget.classList.add('show')
    document.addEventListener('click', this.close)
    document.addEventListener('keydown', this.handleKeydown.bind(this))
  }

  close() {
    this.menuTarget.classList.remove('show')
    document.removeEventListener('click', this.close)
    document.removeEventListener('keydown', this.handleKeydown.bind(this))
  }

  handleKeydown(event) {
    if (event.key === 'Escape') {
      this.close()
    }
  }
}
