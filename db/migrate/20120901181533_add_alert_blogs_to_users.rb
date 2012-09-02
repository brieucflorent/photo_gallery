class AddAlertBlogsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :alert_blogs, :boolean,:default => false

  end
end
