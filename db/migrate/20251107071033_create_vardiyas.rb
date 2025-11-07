class CreateVardiyas < ActiveRecord::Migration[8.0]
  def change
    create_table :vardiyas do |t|
      t.date :tarih
      t.string :baslangic
      t.string :bitis
      t.references :calisan, null: false, foreign_key: true

      t.timestamps
    end
  end
end
