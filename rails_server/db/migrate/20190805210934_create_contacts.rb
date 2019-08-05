class CreateContacts < ActiveRecord::Migration[5.2]
  def change
    create_table :contacts do |t|
      t.string :first_name
      t.string :last_name
      t.string :relation_to_students
      t.integer :phone_number
      t.integer :emergency_phone_number
      t.string :email
      t.string :billing_address
      t.string :billing_info

      t.timestamps
    end
  end
end
