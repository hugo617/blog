# Bookmark 模型 - 收藏网址数据模型
# Model for storing bookmarked websites with metadata
class Bookmark < ApplicationRecord
  belongs_to :user, optional: true
  
  # 验证 - Validations
  validates :title, presence: true, length: { maximum: 200 }
  validates :url, presence: true, format: { with: URI::DEFAULT_PARSER.make_regexp }
  validates :description, length: { maximum: 500 }
  validates :category, presence: true
  
  # 标签处理 - Tag handling (JSON for SQLite compatibility)
  serialize :tags, Array

  # 确保标签始终是数组 - Ensure tags is always an array
  before_save :ensure_tags_is_array

  private

  def ensure_tags_is_array
    self.tags = [] if tags.nil?
    self.tags = [tags] if tags.is_a?(String) && !tags.empty?
    self.tags = tags.compact.uniq if tags.is_a?(Array)
    self.tags = [] if tags.blank?
  end

  public
  
  # 作用域 - Scopes
  scope :featured, -> { where(featured: true) }
  scope :by_category, ->(category) { where(category: category) }
  scope :published, -> { where(published: true) }
  scope :recent, -> { order(created_at: :desc) }
  
  # 搜索功能 - Search functionality (SQLite compatible)
  scope :search, ->(query) {
    return all if query.blank?

    # SQLite compatible search
    where(
      "title LIKE ? OR description LIKE ? OR tags LIKE ? OR category LIKE ?",
      "%#{query}%", "%#{query}%", "%#{query}%", "%#{query}%"
    )
  }
  
  # 实例方法 - Instance methods
  def display_tags
    tags.present? ? tags.join(', ') : ''
  end
  
  def domain
    URI.parse(url).host rescue url
  end
  
  def screenshot_url
    # 使用第三方服务生成网站截图
    # Using third-party service for website screenshots
    return image_url if image_url.present?
    
    "https://api.screenshotmachine.com/?key=demo&url=#{CGI.escape(url)}&dimension=1024x768"
  end
  
  def color_scheme
    # 根据分类返回颜色方案 - Return color scheme based on category
    case category.downcase
    when 'design'
      { primary: '#6366f1', secondary: '#a855f7' }
    when 'development'
      { primary: '#10b981', secondary: '#06b6d4' }
    when 'inspiration'
      { primary: '#f59e0b', secondary: '#ef4444' }
    when 'tools'
      { primary: '#8b5cf6', secondary: '#ec4899' }
    when 'resources'
      { primary: '#06b6d4', secondary: '#10b981' }
    else
      { primary: '#6b7280', secondary: '#9ca3af' }
    end
  end
end
