class UserMailer < ActionMailer::Base
  #default :to => User.where(:first_name => "Brieuc",:last_name => "Florent").map(&:email)
  default :to => User.find(:all,:conditions => ["lower(first_name) =? and lower(last_name)=?","zita","oravecz"]).map(&:email)
  
  def sendmail_to_contact(current_user,ubject,body)
    email_with_name= "#{current_user.first_name + " " + current_user.last_name} <#{current_user.email}"
    mail(:from => email_with_name,:subject => "From website: " + "subject",:body => body)
    
  end
  
  def sendalert_photo(current_user,photo)
    body="Zita just posted a new photo " + photo
    mail(:from => "noreply@personal.zitaoravecz.net",:to => current_user.email,:subject => "Zita just posted a new photo",:body => body)
    
  end

  def sendalert_blog(current_user,blog)
    body= "Zita just added a new blog " + blog
    mail(:from => "noreply@personal.zitaoravecz.net",:to => current_user.email,:subject => "Zita just added a new blog",:body => body)
    
  end
  
end
