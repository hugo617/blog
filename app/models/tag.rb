class Tag < ApplicationRecord
  extend FriendlyId
  
  # Associations
  has_many :post_tags, dependent: :destroy
  has_many :posts, through: :post_tags

  # FriendlyId configuration
  friendly_id :name, use: :slugged

  # Validations
  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates :slug, presence: true, uniqueness: true

  # Scopes
  scope :popular, -> { order(posts_count: :desc) }
  scope :alphabetical, -> { order(:name) }

  # Callbacks
  before_validation :normalize_name

  # Ransack configuration
  def self.ransackable_attributes(auth_object = nil)
    ["name", "description", "posts_count", "created_at", "updated_at"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["posts"]
  end

  # Instance methods
  def to_param
    slug
  end

  private

  def normalize_name
    self.name = name.strip.downcase if name.present?
  end

  def should_generate_new_friendly_id?
    name_changed? || super
  end
end
