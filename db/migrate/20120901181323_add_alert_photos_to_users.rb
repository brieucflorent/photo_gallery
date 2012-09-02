class AddAlertPhotosToUsers < ActiveRecord::Migration
  def change
    add_column :users, :alert_photos, :boolean,:default => false

  end
end
