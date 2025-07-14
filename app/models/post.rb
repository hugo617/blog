class Post < ApplicationRecord
  extend FriendlyId
  
  # Associations
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags
  has_rich_text :content

  # FriendlyId configuration
  friendly_id :title, use: :slugged

  # Validations
  validates :title, presence: true, length: { minimum: 5, maximum: 255 }
  validates :content, presence: true
  validates :slug, presence: true, uniqueness: true

  # Scopes
  scope :published, -> { where(published: true) }
  scope :draft, -> { where(published: false) }
  scope :recent, -> { order(created_at: :desc) }
  scope :by_tag, ->(tag) { joins(:tags).where(tags: { slug: tag }) }

  # Callbacks
  before_save :set_published_at, if: :will_save_change_to_published?
  before_save :generate_excerpt

  # Ransack configuration
  def self.ransackable_attributes(auth_object = nil)
    ["title", "excerpt", "published", "published_at", "created_at", "updated_at"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["user", "tags", "comments"]
  end

  # Instance methods
  def published?
    published
  end

  def draft?
    !published
  end

  # 计算阅读时间 - Calculate reading time
  # 基于内容字数估算阅读时间，假设每分钟阅读200个单词
  def reading_time
    return 0 if content.blank?

    word_count = content.to_plain_text.split.size
    (word_count / 200.0).ceil # 假设每分钟阅读200个单词 - Assuming 200 words per minute reading speed
  end

  # 为AURORA设计生成一致的图片URL - Generate a consistent image URL for the AURORA design
  # 此方法为没有附加图片的文章提供占位符图片 - This method provides placeholder images for posts that don't have attached images
  def image_url
    # 如果文章有附加图片，使用它 - If the post has an attached image, use it
    # 目前我们使用Picsum Photos的占位符图片 - For now, we'll use placeholder images from Picsum Photos
    # 随机种子基于文章ID以确保一致性 - The random seed is based on the post ID to ensure consistency
    heights = [400, 500, 600, 450, 550, 650]
    height = heights[id % heights.length]
    "https://picsum.photos/400/#{height}?random=#{id}"
  end

  # 获取内容的前几个单词作为预览 - Helper method to get the first few words of content as a preview
  # 用于在卡片中显示文章摘要 - Used to display article summary in cards
  def content_preview(word_limit = 30)
    return '' if content.blank?

    plain_text = content.to_plain_text
    words = plain_text.split
    if words.length > word_limit
      words.first(word_limit).join(' ') + '...'
    else
      plain_text
    end
  end

  # 获取主要标签用于显示 - Get the primary tag for display purposes
  # 返回第一个标签或默认的'Blog'标签 - Returns the first tag or default 'Blog' tag
  def primary_tag
    tags.first&.name || 'Blog'
  end

  private

  def set_published_at
    if published? && published_at.blank?
      self.published_at = Time.current
    elsif !published?
      self.published_at = nil
    end
  end

  def generate_excerpt
    return if content.blank?
    
    plain_text = content.to_plain_text
    self.excerpt = plain_text.truncate(300)
  end

  def should_generate_new_friendly_id?
    title_changed? || super
  end
end
