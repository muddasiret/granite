class AddSlugToTask < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :slug, :string
  end
end