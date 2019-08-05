class CreateUserSchools < ActiveRecord::Migration[5.2]
  def change
    create_table :user_schools do |t|

      t.timestamps
    end
  end
end
