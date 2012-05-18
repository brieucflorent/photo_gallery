class PhotosController < ApplicationController
  layout :resolve_layout
  def resolve_layout
    case action_name
    when "index"
     "photo_index"
    else
     "photo"
    end
  end
  # GET /photos
  # GET /photos.json
  def index
    @abouts = Album.where("menu = :about",:about => "about").order(:ordering)    
    @albumphotos = Album.where("menu = :photos",:photos => "photos").order(:ordering)
    @projects = Album.where(:menu => "projects")    
    #@photos = Photo.find(:all, :order => "ordering")
    @album = @albumphotos.first
    @photos = @album.photos.sort { |a,b| a.ordering <=> b.ordering }
    @allphotos = Photo.all
    
    #Dir.entries("app/assets/images/gallery/").each do |entry|
    #  if entry =~ /\d+\.jpg/
    #    @photos << Photo.new(:mainfile=>"/assets/gallery/" + entry,:thumbfile => "/assets/gallery/" + entry.gsub(/\.jpg/,'') + "_thumb.jpg" )
    #  end
    #end
    if @photos.length == 0
      redirect_to admin_photos_uploader_url
    else
      respond_to do |format|
        format.html # index.html.erb
        format.json { render json: @photos }
      end
    end

  end

  # GET /photos/1
  # GET /photos/1.json
  def show
    @photo = Photo.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @photo }
    end
  end

  # GET /photos/new
  # GET /photos/new.json
  def new
    @album = Album.new
    @photo = @album.photos.build

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @photo }
    end
  end

 

  # GET /photos/1/edit
  def edit
    @photo = Photo.find(params[:id])
  end

  # POST /photos
  # POST /photos.json
  def create
    @photo = Photo.new(params[:photo])

    respond_to do |format|
      if @photo.save
        format.html { redirect_to @photo, notice: 'Photo was successfully created.' }
        format.json { render json: @photo, status: :created, location: @photo }
      else
        format.html { render action: "new" }
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /photos/1
  # PUT /photos/1.json
  def update
    @photo = Photo.find(params[:id])

    respond_to do |format|
      if @photo.update_attributes(params[:photo])
        format.html { redirect_to @photo, notice: 'Photo was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /photos/1
  # DELETE /photos/1.json
  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy

    respond_to do |format|
      format.html { redirect_to photos_url }
      format.json { head :no_content }
    end
  end
  
  def contacts
    respond_to :html,:js
    if current_user.blank?
    flash[:notice] = "Please log in to send a message" 
    elsif params[:body].blank? or params[:subject].blank?
    flash[:notice] = "Missing subject or message"
    else
    body=params[:body]
    subject=params[:subject]
    UserMailer.sendmail_to_contact(current_user,subject,body).deliver  
    flash[:notice] = "Message successfully sent "    
    end
  end
  
  def contacts_logoff
    respond_to :html,:js
    reset_session
    if current_user.blank?
      flash[:notice] = "user logged off" 
    end
  end
  
end
