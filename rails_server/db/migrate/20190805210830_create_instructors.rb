class CreateInstructors < ActiveRecord::Migration[5.2]
  def change
    create_table :instructors do |t|
      t.string :first_name
      t.string :last_name
      t.date :date_of_birth
      t.integer :phone_number
      t.integer :emergency_number
      t.string :email
      t.string :billing_address
      t.text :biography
      t.string :instrument_1
      t.string :instrument_2
      t.string :instrument_3
      t.text :misc_notes
      t.integer :rate_per_hour

      t.timestamps
    end
  end
end
