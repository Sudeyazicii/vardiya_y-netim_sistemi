class CreateCalisans < ActiveRecord::Migration[8.0]
  def change
    create_table :calisans do |t|
      t.string :ad
      t.string :soyad
      t.string :email

      t.timestamps
    end
  end
end
