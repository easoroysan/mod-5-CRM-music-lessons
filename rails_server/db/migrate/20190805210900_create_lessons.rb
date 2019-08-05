class CreateLessons < ActiveRecord::Migration[5.2]
  def change
    create_table :lessons do |t|
      t.boolean :active
      t.text :misc_notes
      t.text :instructor_notes
      t.text :attendance #make it as a long string of dates seperated by commas?
      t.string :instrument
      t.integer :price

      t.timestamps
    end
  end
end
