class CreateDepartmen < ActiveRecord::Migration[8.0]
  def change
    create_table :departmen do |t|
      t.string :ad

      t.timestamps
    end
  end
end
