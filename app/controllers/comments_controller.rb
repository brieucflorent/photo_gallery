class CommentsController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.create(:body => params[:content],:user_id => current_user.id)
    

    respond_to do |format|
      if @comment.save
        format.html { redirect_to post_path(@post), notice: 'album was successfully created.' }
        format.json { render json: post_path, status: :created, location: @post }
        format.js 
      else
        format.html { render action: "new" }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
        format.js
      end
    end
    #redirect_to post_path(@post)
  end
end
