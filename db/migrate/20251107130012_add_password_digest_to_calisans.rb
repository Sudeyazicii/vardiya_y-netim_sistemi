class AddPasswordDigestToCalisans < ActiveRecord::Migration[8.0]
  def change
    add_column :calisans, :password_digest, :string
  end
end
