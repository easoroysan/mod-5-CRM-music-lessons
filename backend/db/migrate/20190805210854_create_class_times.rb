class CreateClassTimes < ActiveRecord::Migration[5.2]
  def change
    create_table :class_times do |t|
      t.string :day
      t.time :start_time
      t.time :end_time
      t.boolean :active
      t.references :school, foreign_key: true
      t.references :instructor, foreign_key: true

      t.timestamps
    end
  end
end
