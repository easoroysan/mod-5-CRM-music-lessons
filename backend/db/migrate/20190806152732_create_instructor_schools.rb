class CreateInstructorSchools < ActiveRecord::Migration[5.2]
  def change
    create_table :instructor_schools do |t|
      t.references :instructor, foreign_key: true
      t.references :school, foreign_key: true

      t.timestamps
    end
  end
end
