class Instructor < ApplicationRecord
    has_many :instructor_schools
    has_many :schools, through: :instructor_schools
    has_many :class_times
    has_many :lessons, through: :class_times
    has_many :students, through: :lessons
end
