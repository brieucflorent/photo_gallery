class Album < ActiveRecord::Base
  has_many :photos,  :dependent => :destroy
  def photos=(attrs)
    attrs.each { |attr| self.photos.build(:imagefile => attr) }
  end
end
