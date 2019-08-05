class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :username
      t.string :password #this will probably need to change for security
      t.string :email
      t.string :permissions #this might need to change depending on how I set up the permissions

      t.timestamps
    end
  end
end
