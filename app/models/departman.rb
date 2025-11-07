class Departman < ApplicationRecord
  has_many :calisans, dependent: :destroy

  validates :ad, presence: true
end
