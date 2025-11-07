# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_11_07_130012) do
  create_table "calisans", force: :cascade do |t|
    t.string "ad"
    t.string "soyad"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "departman_id"
    t.string "password_digest"
    t.index ["departman_id"], name: "index_calisans_on_departman_id"
  end

  create_table "departmen", force: :cascade do |t|
    t.string "ad"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "vardiyas", force: :cascade do |t|
    t.date "tarih"
    t.string "baslangic"
    t.string "bitis"
    t.integer "calisan_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["calisan_id"], name: "index_vardiyas_on_calisan_id"
  end

  add_foreign_key "calisans", "departmen"
  add_foreign_key "vardiyas", "calisans"
end
