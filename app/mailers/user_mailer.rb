class UserMailer < ActionMailer::Base
  #default :to => User.where(:first_name => "Brieuc",:last_name => "Florent").map(&:email)
  default :to => User.find(:all,:conditions => ["lower(first_name) =? and lower(last_name)=?","brieuc","florent"]).map(&:email)
  
  def sendmail_to_contact(current_user,ubject,body)
    email_with_name= "#{current_user.first_name + " " + current_user.last_name} <#{current_user.email}"
    mail(:from => email_with_name,:subject => "From website: " + "subject",:body => body)
    
  end
  
end
