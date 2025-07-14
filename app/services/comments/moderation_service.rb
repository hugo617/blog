class Comments::ModerationService < ApplicationService
  SPAM_KEYWORDS = %w[
    viagra cialis pharmacy casino gambling loan credit
    free money win prize lottery click here
  ].freeze

  def initialize(comment)
    @comment = comment
  end

  def call
    return failure("Comment not found") unless comment

    if should_auto_approve?
      approve_comment
    elsif should_auto_reject?
      reject_comment
    else
      mark_for_manual_review
    end
  end

  private

  attr_reader :comment

  def should_auto_approve?
    return false if contains_spam_keywords?
    return false if has_suspicious_links?
    
    # Auto-approve if user has previously approved comments
    comment.user.comments.approved.count >= 3
  end

  def should_auto_reject?
    return true if contains_spam_keywords?
    return true if has_suspicious_links?
    return true if comment.body.length < 10
    
    false
  end

  def contains_spam_keywords?
    body_downcase = comment.body.downcase
    SPAM_KEYWORDS.any? { |keyword| body_downcase.include?(keyword) }
  end

  def has_suspicious_links?
    # Check for multiple links or suspicious domains
    link_count = comment.body.scan(/https?:\/\//).count
    link_count > 2
  end

  def approve_comment
    comment.update!(approved: true)
    notify_post_author
    success(comment)
  rescue ActiveRecord::RecordInvalid => e
    failure(e.message)
  end

  def reject_comment
    comment.update!(approved: false)
    success(comment)
  rescue ActiveRecord::RecordInvalid => e
    failure(e.message)
  end

  def mark_for_manual_review
    # Comment remains with approved: false for manual review
    notify_moderators
    success(comment)
  end

  def notify_post_author
    # Logic to notify post author about new approved comment
    # This should be moved to a background job in production
  end

  def notify_moderators
    # Logic to notify moderators about comment pending review
    # This should be moved to a background job in production
  end
end
