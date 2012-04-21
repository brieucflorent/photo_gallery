class Photo < ActiveRecord::Base
  attr_accessible :imagefile
  belongs_to :album
  mount_uploader :imagefile, PhotoUploader
end
