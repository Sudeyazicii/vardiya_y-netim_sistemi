# app/models/calisan.rb
class Calisan < ApplicationRecord
  belongs_to :departman, optional: true
  has_many :vardiyas, dependent: :destroy

  # Şifreyi güvenli saklamak için
  has_secure_password

  # Validasyonlar
  validates :ad, presence: true
  validates :soyad, presence: true
  validates :email, presence: true, uniqueness: true
end
