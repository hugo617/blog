class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # Associations
  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy

  # Validations
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true

  # 实例方法 - Instance methods

  # 获取用户全名 - Get user's full name
  # 组合名字和姓氏，去除多余空格 - Combine first and last name, strip extra spaces
  def full_name
    "#{first_name} #{last_name}".strip
  end

  # 获取显示名称 - Get display name
  # 优先使用全名，如果为空则使用邮箱 - Prefer full name, fallback to email if empty
  def display_name
    full_name.present? ? full_name : email
  end

  # 简单的管理员检查 - Simple admin check
  # 在真实应用中，你可能在数据库中有admin字段 - In a real application, you might have an admin field in the database
  # 或者检查特定的邮箱地址 - or check against specific email addresses
  def admin?
    # 演示目的，可以让第一个用户成为管理员 - For demo purposes, you can make the first user an admin
    # 或者检查特定的邮箱地址 - or check against specific email addresses
    email == 'admin@example.com'
  end
end
