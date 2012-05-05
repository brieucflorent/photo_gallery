class Photo < ActiveRecord::Base
  attr_accessible :imagefile,:title,:ordering
  belongs_to :album
  mount_uploader :imagefile, PhotoUploader
end
