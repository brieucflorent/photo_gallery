class UsersController < ApplicationController
  
  def update
    @user = User.find(params[:id])

    respond_to do |format|
      if current_user.id = @user.id and @user.update_attributes(params[:user])
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end
end
