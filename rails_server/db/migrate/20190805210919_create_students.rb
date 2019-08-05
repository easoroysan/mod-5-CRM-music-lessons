class CreateStudents < ActiveRecord::Migration[5.2]
  def change
    create_table :students do |t|
      t.string :first_name
      t.string :last_name
      t.date :date_of_birth
      t.string :medical_notes
      t.text :billing_notes
      t.text :misc_notes
      t.integer :phone_number
      t.string :email

      t.timestamps
    end
  end
end
