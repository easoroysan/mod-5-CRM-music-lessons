class CreateStudents < ActiveRecord::Migration[5.2]
  def change
    create_table :students do |t|
      t.string :first_name
      t.string :last_name
      t.date :date_of_birth
      t.string :medical_notes
      t.text :billing_notes
      t.text :misc_notes
      t.string :phone_number
      t.string :email
      t.references :school, foreign_key: true
      t.references :family, foreign_key: true

      t.timestamps
    end
  end
end
