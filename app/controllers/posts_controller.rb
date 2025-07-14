class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:index, :show]

  def index
    # Set up search with Ransack
    @q = Post.published.ransack(params[:q])
    @posts = @q.result.includes(:user, :tags).recent

    # Pagination - increase per page for masonry grid
    @posts = @posts.page(params[:page]).per(12) if defined?(Kaminari)

    # Get popular tags for filtering
    @tags = Tag.popular.limit(20)

    # For the AURORA design, we want to ensure we have some posts for the journal section
    # even if the main search returns no results
    @recent_posts = Post.published.includes(:user, :tags).recent.limit(6)
  end

  def show
    authorize @post
    @post.increment!(:views_count) if @post.published?
    @comment = Comment.new
    @comments = @post.comments.approved.includes(:user).recent
  end

  def new
    @post = current_user.posts.build
    authorize @post
  end

  def create
    @post = current_user.posts.build(post_params)
    authorize @post

    if @post.save
      redirect_to @post, notice: 'Post was successfully created.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    authorize @post
  end

  def update
    authorize @post
    
    if @post.update(post_params)
      redirect_to @post, notice: 'Post was successfully updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @post
    @post.destroy
    redirect_to posts_url, notice: 'Post was successfully deleted.'
  end

  private

  def set_post
    @post = Post.friendly.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :content, :excerpt, :published, tag_ids: [])
  end
end
