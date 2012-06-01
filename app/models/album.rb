class Album < ActiveRecord::Base
  attr_accessible :imagefile,:name,:description,:ordering,:menu,:template_color
  has_many :photos,  :dependent => :destroy
  
  after_initialize :default_values

  private
    def default_values
      self.template_color ||= 1
    end
    
  def photos=(attrs)
    attrs.each { |attr| self.photos.build(:imagefile => attr) }
  end
end
