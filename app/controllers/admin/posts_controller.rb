class Admin::PostsController < Admin::AdminController
  # GET /posts
  # GET /posts.json
  layout :resolve_layout
  def resolve_layout
    case action_name
    when "index",'show'
     "blog"
    when 'new'
       "blog_new" 
    else
     "application"
    end
  end
  
  def index
    @posts = Post.order("created_at DESC")

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @posts }
    end
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    @post = Post.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @post }
    end
  end

  # GET /posts/new
  # GET /posts/new.json
  def new
    @post = Post.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @post }
    end
  end

  # GET /posts/1/edit
  def edit
    @post = Post.find(params[:id])
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(params[:post])
    valid =false
    respond_to do |format|
      if @post.save        
        User.where(:alert_blogs => :true).each do |myuser|
           UserMailer.sendalert_blog(myuser,post_url(@post)).deliver  
        end
        format.html { redirect_to admin_posts_url, notice: 'Post was successfully created.' }
        format.json { render json: @post, status: :created, location: @post }        
      else
        format.html { render action: "new" }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /posts/1
  # PUT /posts/1.json
  def update
    @post = Post.find(params[:id])

    respond_to do |format|
      if @post.update_attributes(params[:post])
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def mercury_update
    #page = Page.find(params[:id])
    #page.name = params[:content][:page_name][:value]
    #page.content = params[:content][:page_content][:value]
    #page.save!
    if params[:content].has_key?("new_title") and params[:content].has_key?("new_post_content")
      @post= Post.new
      @post.title= params[:content]["new_title"][:value]
      @post.content=params[:content]["new_post_content"][:value]
      @post.save
    else
    params[:content].keys.each do |key|
      if key.start_with?("post_content")
        @post = Post.find(key.gsub(/post_content/,''))
        @post.content = params[:content][key][:value]
        @post.save
      end
      if key.start_with?("title")
        @post = Post.find(key.gsub(/title/,''))
        @post.title = params[:content][key][:value]
        @post.save
      end
    end  
    end
    
    
    render text: ''
  end
  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post = Post.find(params[:id])
    @post.destroy

    respond_to do |format|
      format.html { redirect_to admin_posts_url }
      format.json { head :no_content }
    end
  end
end
