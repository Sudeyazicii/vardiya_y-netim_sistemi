class AddDepartmanToCalisans < ActiveRecord::Migration[8.0]
  def change
        add_reference :calisans, :departman, null: true, foreign_key: true
  end
end
