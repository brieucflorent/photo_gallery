class ChangeDatatypeAlerts < ActiveRecord::Migration
  def up
    change_column :users, :alert_blogs, :string
    change_column :users, :alert_photos, :string
  end

  def down
    change_column :users, :alert_blogs, :boolean
    change_column :users, :alert_photos, :boolean
  end
end
