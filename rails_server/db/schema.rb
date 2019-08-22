# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_12_154314) do

  create_table "attendances", force: :cascade do |t|
    t.integer "lesson_id"
    t.integer "school_id"
    t.date "date"
    t.string "status"
    t.boolean "make_up"
    t.string "cancelled_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["lesson_id"], name: "index_attendances_on_lesson_id"
    t.index ["school_id"], name: "index_attendances_on_school_id"
  end

  create_table "class_times", force: :cascade do |t|
    t.string "day"
    t.time "start_time"
    t.time "end_time"
    t.boolean "active"
    t.integer "school_id"
    t.integer "instructor_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["instructor_id"], name: "index_class_times_on_instructor_id"
    t.index ["school_id"], name: "index_class_times_on_school_id"
  end

  create_table "contacts", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "relation_to_students"
    t.string "phone_number"
    t.string "emergency_number"
    t.string "email"
    t.string "billing_address"
    t.string "billing_info"
    t.integer "school_id"
    t.integer "family_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["family_id"], name: "index_contacts_on_family_id"
    t.index ["school_id"], name: "index_contacts_on_school_id"
  end

  create_table "families", force: :cascade do |t|
    t.string "family_name"
    t.text "misc_notes"
    t.integer "billing_total"
    t.integer "school_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["school_id"], name: "index_families_on_school_id"
  end

  create_table "instructor_schools", force: :cascade do |t|
    t.integer "instructor_id"
    t.integer "school_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["instructor_id"], name: "index_instructor_schools_on_instructor_id"
    t.index ["school_id"], name: "index_instructor_schools_on_school_id"
  end

  create_table "instructors", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.date "date_of_birth"
    t.string "phone_number"
    t.string "emergency_number"
    t.string "email"
    t.string "billing_address"
    t.text "biography"
    t.string "instrument_1"
    t.string "instrument_2"
    t.string "instrument_3"
    t.text "misc_notes"
    t.integer "pay_rate"
    t.boolean "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "lessons", force: :cascade do |t|
    t.boolean "active"
    t.text "misc_notes"
    t.text "instructor_notes"
    t.string "instrument"
    t.integer "price"
    t.integer "school_id"
    t.integer "class_time_id"
    t.integer "student_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["class_time_id"], name: "index_lessons_on_class_time_id"
    t.index ["school_id"], name: "index_lessons_on_school_id"
    t.index ["student_id"], name: "index_lessons_on_student_id"
  end

  create_table "schools", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "students", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.date "date_of_birth"
    t.string "medical_notes"
    t.text "billing_notes"
    t.text "misc_notes"
    t.string "phone_number"
    t.string "email"
    t.integer "school_id"
    t.integer "family_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["family_id"], name: "index_students_on_family_id"
    t.index ["school_id"], name: "index_students_on_school_id"
  end

  create_table "user_schools", force: :cascade do |t|
    t.integer "user_id"
    t.integer "school_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["school_id"], name: "index_user_schools_on_school_id"
    t.index ["user_id"], name: "index_user_schools_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "username"
    t.string "password_digest"
    t.string "email"
    t.string "permissions"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
