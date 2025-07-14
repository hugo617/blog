class CommentComponent < ApplicationComponent
  def initialize(comment:, show_moderation: false)
    @comment = comment
    @show_moderation = show_moderation
  end

  private

  attr_reader :comment, :show_moderation

  def user_presenter
    @user_presenter ||= UserPresenter.new(comment.user)
  end

  def formatted_date
    comment.created_at.strftime("%B %d, %Y at %I:%M %p")
  end

  def can_moderate?
    show_moderation && current_user&.admin?
  end

  def can_edit?
    current_user == comment.user
  end

  def can_delete?
    current_user == comment.user || current_user&.admin?
  end

  def approval_status_class
    comment.approved? ? "border-green-200" : "border-yellow-200 bg-yellow-50"
  end
end
