class Comment < ApplicationRecord
  # Associations
  belongs_to :user
  belongs_to :post, counter_cache: true

  # Validations
  validates :body, presence: true, length: { minimum: 10, maximum: 1000 }

  # Scopes
  scope :approved, -> { where(approved: true) }
  scope :pending, -> { where(approved: false) }
  scope :recent, -> { order(created_at: :desc) }

  # Instance methods
  def approved?
    approved
  end

  def pending?
    !approved
  end

  def approve!
    update!(approved: true)
  end

  def reject!
    update!(approved: false)
  end
end
