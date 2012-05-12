class Admin::AlbumsController < ApplicationController
  layout "album"
  
  before_filter :require_admin, :except => :index
  
  
  def require_admin
      if current_user.blank?
        flash[:notice] = "Please log in first"
        redirect_to admin_albums_url
      elsif not ['zita_oravecz','nicolas_auvillain','brieuc_florent'].include?(current_user.first_name.downcase + "_" + current_user.last_name.downcase)
        flash[:notice] = "You must have admin rights"
        redirect_to admin_albums_url
      end
  end
  private :require_admin
   # GET /albums
  # GET /albums.json
  def index
    
    if current_user.blank?
      flash[:notice] = "You must login to make updates"
    end
    
    @albums = Album.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @albums }
    end
  end

  # GET /albums/1
  # GET /albums/1.json
  def show
    @albums= Album.all
    @album = Album.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @album }
    end
  end

  # GET /albums/new
  # GET /albums/new.json
  def new
    @album = Album.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @album }
    end
  end

  # GET /albums/1/edit
  def edit
    @album = Album.find(params[:id])
  end

  # POST /albums
  # POST /albums.json
  def create
    @album = Album.new(params[:album])

    respond_to do |format|
      if @album.save
        format.html { redirect_to admin_albums_url, notice: 'album was successfully created.' }
        format.json { render json: admin_albums_url, status: :created, location: @album }
      else
        format.html { render action: "new" }
        format.json { render json: @album.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /albums/1
  # PUT /albums/1.json
  def update
    @album = Album.find(params[:id])

    respond_to do |format|
      if @album.update_attributes(params[:album])
        format.html { redirect_to @album, notice: 'album was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @album.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /albums/1
  # DELETE /albums/1.json
  def destroy
    @album = Album.find(params[:id])
    @album.destroy

    respond_to do |format|
      format.html { redirect_to admin_albums_url }
      format.json { head :no_content }
    end
  end
  
  def select_album
    session[:album]=params[:id]
    respond_to do |format|
      format.html { redirect_to admin_albums_url }
      format.json { head :no_content }
    end
  end
  
end
