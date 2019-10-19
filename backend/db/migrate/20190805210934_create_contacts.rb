class CreateContacts < ActiveRecord::Migration[5.2]
  def change
    create_table :contacts do |t|
      t.string :first_name
      t.string :last_name
      t.string :relation_to_students
      t.string :phone_number
      t.string :emergency_number
      t.string :email
      t.string :billing_address
      t.string :billing_info
      t.references :school, foreign_key: true
      t.references :family, foreign_key: true

      t.timestamps
    end
  end
end
