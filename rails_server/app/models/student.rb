class Student < ApplicationRecord
    has_many :lessons
    has_many :class_times, through: :lessons
    # has_many :instructors, through: :class_times #not sure if I need this one
    belongs_to :family
    belongs_to :school
end
