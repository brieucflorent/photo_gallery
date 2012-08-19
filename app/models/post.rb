class Post < ActiveRecord::Base
  attr_accessible :content, :title
 
  validates :title, :presence => true,
                    :length => { :minimum => 5 }
                    
  has_many :comments, :dependent => :delete_all                  
end