class PostsController < ApplicationController
  # GET /posts
  # GET /posts.json
  layout :resolve_layout
  def resolve_layout
    case action_name
    when "index","show",'new'
     "blog"
    else
     "application"
    end
  end
  
  def index
    
    @search = Post.search(params[:q])
    @posts = @search.result
    @posts.sort! {|a,b| a.created_at <=> b.created_at}.reverse!
   # @search.build_condition if @search.conditions.empty?
    @search.build_sort if @search.sorts.empty?
    #@posts = Post.order("created_at DESC")

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @posts }
      format.js
    end
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    
    @search = Post.search(params[:q])
    @posts = @search.result
    @posts.sort! {|a,b| a.created_at <=> b.created_at}.reverse!
    @post = Post.find(params[:id])
    @search.build_sort if @search.sorts.empty?
   
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @post }
      format.js
    end
  end


  def new
    
    respond_to do |format|
      format.html # new.html.erb
      format.json 
    end
  end

end
