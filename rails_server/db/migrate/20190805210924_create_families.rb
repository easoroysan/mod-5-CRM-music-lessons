class CreateFamilies < ActiveRecord::Migration[5.2]
  def change
    create_table :families do |t|
      t.string :family_name
      t.text :misc_notes
      t.integer :billing_total
      t.references :school, foreign_key: true

      t.timestamps
    end
  end
end
