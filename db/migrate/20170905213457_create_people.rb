class CreatePeople < ActiveRecord::Migration[5.1]
  def change
    create_table :people do |t|
      t.string :name
      t.string :age
      t.belongs_to :career, foreign_key: true

      t.timestamps
    end
  end
end
