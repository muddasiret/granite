class AddAssignedUserToTasks < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :assigned_user, :string
  end
end
