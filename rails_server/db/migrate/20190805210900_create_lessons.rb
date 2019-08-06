class CreateLessons < ActiveRecord::Migration[5.2]
  def change
    create_table :lessons do |t|
      t.boolean :active
      t.text :misc_notes
      t.text :instructor_notes
      t.text :attendance #make it as a long string of dates seperated by commas?
      t.string :instrument
      t.integer :price
      t.references :school, foreign_key: true
      t.references :class_time, foreign_key: true
      t.references :student, foreign_key: true

      t.timestamps
    end
  end
end
