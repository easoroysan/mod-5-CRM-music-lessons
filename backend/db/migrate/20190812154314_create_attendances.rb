class CreateAttendances < ActiveRecord::Migration[5.2]
  def change
    create_table :attendances do |t|
      t.references :lesson, foreign_key: true
      t.references :school, foreign_key: true
      t.date :date
      t.string :status
      t.boolean :make_up
      t.string :cancelled_date

      t.timestamps
    end
  end
end
