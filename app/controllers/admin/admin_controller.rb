class Admin::AdminController < ApplicationController
  before_filter :require_admin
  
  
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
end