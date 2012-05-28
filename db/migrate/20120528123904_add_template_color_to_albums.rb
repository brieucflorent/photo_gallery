class AddTemplateColorToAlbums < ActiveRecord::Migration
  def change
    add_column :albums, :template_color, :integer

  end
end
