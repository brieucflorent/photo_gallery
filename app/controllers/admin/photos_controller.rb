class Admin::PhotosController < ApplicationController
  layout :resolve_layout
  def resolve_layout
    case action_name
    when "uploader"
      "uploader"
    else
    "photo"
    end
  end

  # GET /photos
  # GET /photos.json
  def index
    @albums = Album.all
    @photos = Photo.find(:all, :order => "ordering")
    #@photos = Photo.all
    #Dir.entries("app/assets/images/gallery/").each do |entry|
    #  if entry =~ /\d+\.jpg/
    #    @photos << Photo.new(:mainfile=>"/assets/gallery/" + entry,:thumbfile => "/assets/gallery/" + entry.gsub(/\.jpg/,'') + "_thumb.jpg" )
    #  end
    #end
    if @photos.length == 0
      #redirect_to url_for([:uploader,:admin,:photo])
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
  
 def uploader
    @albums=Album.all
    if current_user.blank?
      flash[:notice] = "Please log in to upload files"
      respond_to do |format|
        format.html
        format.json { render json: @photo }
      end
    elsif not ['zita_oravecz','nicolas_auvillain','brieuc_florent'].include?(current_user.first_name.downcase + "_" + current_user.last_name.downcase)
      flash[:notice] = "You must have admin rights to upload files"
      respond_to do |format|
        format.html
        format.json { render json: @photo }
      end
    elsif session[:album].blank?
      flash[:notice] = "First select an album"
      respond_to do |format|
        format.html
        format.json { render json: @photo }
      end
    else
      @album=Album.find(session[:album])
      if params.include?(:file)
        @photo = Photo.new(:imagefile => params[:file])
        @photo.album=@album
        if @photo.save
          @photo.title=@photo.imagefile.to_s.split('/').last.split('.jpg').first
          @photo.save
          respond_to do |format|
            format.json {render json:{:success => true}}
          end
        else
          respond_to do |format|
            format.json {render json:{:error => "unable to save"}}
          end
        end
      else
        respond_to do |format|
          format.html
          format.json { render json: @photo }
        end
      end
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
    @album = @photo.album
    @photo.destroy

    respond_to do |format|
      format.html { redirect_to admin_album_url(@album) }
      format.json { head :no_content }
    end
  end
end
