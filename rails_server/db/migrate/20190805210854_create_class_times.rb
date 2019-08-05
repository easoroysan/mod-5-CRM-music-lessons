class CreateClassTimes < ActiveRecord::Migration[5.2]
  def change
    create_table :class_times do |t|
      t.string :day
      t.time :start_time
      t.time :end_time #not sure if t.time is real

      t.timestamps
    end
  end
end
