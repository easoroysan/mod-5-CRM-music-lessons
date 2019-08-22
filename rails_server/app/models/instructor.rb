class Instructor < ApplicationRecord
    has_many :instructor_schools
    has_many :schools, through: :instructor_schools
    has_many :class_times
    has_many :lessons, through: :class_times
    has_many :students, through: :lessons

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :date_of_birth, presence: true
    validates :phone_number, presence: true
    validates :email, presence: true
    validates :instrument_1, presence: true

end
