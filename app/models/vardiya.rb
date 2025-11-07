class Vardiya < ApplicationRecord
  belongs_to :calisan

  validates :tarih, presence: true
  validates :baslangic, presence: true
  validates :bitis, presence: true
end
