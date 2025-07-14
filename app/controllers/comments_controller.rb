class CommentsController < ApplicationController
  before_action :set_post
  before_action :set_comment, only: [:show, :edit, :update, :destroy, :approve, :reject]
  before_action :authenticate_user!

  def create
    @comment = @post.comments.build(comment_params)
    @comment.user = current_user
    authorize @comment

    if @comment.save
      Comments::ModerationService.new(@comment).call
      redirect_to @post, notice: 'Comment was successfully created and is pending approval.'
    else
      @comments = @post.comments.approved.includes(:user).recent
      render 'posts/show', status: :unprocessable_entity
    end
  end

  def edit
    authorize @comment
  end

  def update
    authorize @comment
    
    if @comment.update(comment_params)
      redirect_to @post, notice: 'Comment was successfully updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @comment
    @comment.destroy
    redirect_to @post, notice: 'Comment was successfully deleted.'
  end

  def approve
    authorize @comment
    @comment.approve!
    redirect_back(fallback_location: @post, notice: 'Comment approved.')
  end

  def reject
    authorize @comment
    @comment.reject!
    redirect_back(fallback_location: @post, notice: 'Comment rejected.')
  end

  private

  def set_post
    @post = Post.friendly.find(params[:post_id])
  end

  def set_comment
    @comment = @post.comments.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
