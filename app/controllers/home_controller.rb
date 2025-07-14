class HomeController < ApplicationController
  def index
    @featured_posts = Post.published.recent.limit(3)
    @recent_posts = Post.published.recent.limit(6)
    @popular_tags = Tag.popular.limit(10)
  end
end
