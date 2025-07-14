class Posts::PublisherService < ApplicationService
  def initialize(post, user)
    @post = post
    @user = user
  end

  def call
    return failure("Post not found") unless @post
    return failure("User not authorized") unless can_publish?

    if @post.published?
      unpublish_post
    else
      publish_post
    end
  end

  private

  attr_reader :post, :user

  def can_publish?
    user == post.user || user.admin?
  end

  def publish_post
    post.update!(
      published: true,
      published_at: Time.current
    )
    
    # Additional logic for publishing (notifications, SEO, etc.)
    generate_sitemap
    notify_subscribers if post.user.notify_on_publish?
    
    success(post)
  rescue ActiveRecord::RecordInvalid => e
    failure(e.message)
  end

  def unpublish_post
    post.update!(
      published: false,
      published_at: nil
    )
    
    success(post)
  rescue ActiveRecord::RecordInvalid => e
    failure(e.message)
  end

  def generate_sitemap
    # Logic to regenerate sitemap when new post is published
    # This could be moved to a background job in production
  end

  def notify_subscribers
    # Logic to notify subscribers about new post
    # This should be moved to a background job in production
  end
end
