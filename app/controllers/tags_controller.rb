class TagsController < ApplicationController
  before_action :set_tag, only: [:show]

  def index
    @tags = Tag.includes(:posts).order(:name)
  end

  def show
    @posts = @tag.posts.published.includes(:user, :tags)
    @posts = @posts.page(params[:page]).per(10) if defined?(Kaminari)
  end

  private

  def set_tag
    @tag = Tag.friendly.find(params[:slug])
  end
end
