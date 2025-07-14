# Bookmarks 控制器 - 收藏网址展示控制器
# Controller for displaying bookmarked websites
class BookmarksController < ApplicationController
  before_action :set_bookmark, only: [:show, :increment_views, :toggle_like]
  before_action :authenticate_user!, only: [:toggle_like]
  
  # GET /bookmarks
  # GET /bookmarks.json
  def index
    @bookmarks = Bookmark.published.includes(:user)
    
    # 分类过滤 - Category filtering
    if params[:category].present?
      @bookmarks = @bookmarks.by_category(params[:category])
    end
    
    # 搜索过滤 - Search filtering
    if params[:q].present?
      @bookmarks = @bookmarks.search(params[:q])
      @search_query = params[:q]
    end
    
    # 排序 - Sorting
    case params[:sort]
    when 'popular'
      @bookmarks = @bookmarks.order(views_count: :desc, likes_count: :desc)
    when 'liked'
      @bookmarks = @bookmarks.order(likes_count: :desc)
    else
      @bookmarks = @bookmarks.recent
    end
    
    # 分页 - Pagination (for infinite scroll)
    @bookmarks = @bookmarks.limit(20).offset(params[:offset].to_i)
    
    # 获取分类统计 - Get category statistics
    @categories = Bookmark.published.group(:category).count
    @total_count = Bookmark.published.count
    
    respond_to do |format|
      format.html
      format.json { render json: bookmarks_json }
    end
  end
  
  # GET /bookmarks/featured
  def featured
    @bookmarks = Bookmark.featured.published.recent.limit(20)
    @featured = true
    
    respond_to do |format|
      format.html { render :index }
      format.json { render json: bookmarks_json }
    end
  end
  
  # GET /bookmarks/search
  def search
    @bookmarks = Bookmark.published
    
    if params[:q].present?
      @bookmarks = @bookmarks.search(params[:q])
      @search_query = params[:q]
    end
    
    @bookmarks = @bookmarks.recent.limit(20)
    
    render json: {
      bookmarks: @bookmarks.map { |bookmark| bookmark_json(bookmark) },
      total: @bookmarks.count,
      query: @search_query
    }
  end
  
  # GET /bookmarks/1
  def show
    @related_bookmarks = Bookmark.published
                                 .where(category: @bookmark.category)
                                 .where.not(id: @bookmark.id)
                                 .limit(6)
    
    respond_to do |format|
      format.html
      format.json { render json: bookmark_json(@bookmark) }
    end
  end
  
  # PATCH /bookmarks/1/increment_views
  def increment_views
    @bookmark.increment!(:views_count)
    render json: { views_count: @bookmark.views_count }
  end
  
  # PATCH /bookmarks/1/toggle_like
  def toggle_like
    # 这里可以实现用户点赞功能
    # User like functionality can be implemented here
    @bookmark.increment!(:likes_count)
    render json: { likes_count: @bookmark.likes_count }
  end
  
  private
  
  def set_bookmark
    @bookmark = Bookmark.find(params[:id])
  end
  
  def bookmarks_json
    {
      bookmarks: @bookmarks.map { |bookmark| bookmark_json(bookmark) },
      total: @total_count || @bookmarks.count,
      categories: @categories || {},
      search_query: @search_query
    }
  end
  
  def bookmark_json(bookmark)
    {
      id: bookmark.id,
      title: bookmark.title,
      description: bookmark.description,
      url: bookmark.url,
      domain: bookmark.domain,
      image_url: bookmark.screenshot_url,
      category: bookmark.category,
      tags: bookmark.tags,
      views_count: bookmark.views_count,
      likes_count: bookmark.likes_count,
      featured: bookmark.featured,
      color_scheme: bookmark.color_scheme,
      created_at: bookmark.created_at.iso8601
    }
  end
end
