import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="search"
export default class extends Controller {
  toggle() {
    // 简单的搜索功能，可以后续扩展
    // Simple search functionality, can be extended later
    const searchQuery = prompt('Search for posts...')
    if (searchQuery) {
      window.location.href = `/posts?q[title_cont]=${encodeURIComponent(searchQuery)}`
    }
  }
}
