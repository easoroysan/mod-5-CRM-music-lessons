class Student < ApplicationRecord
    has_many :lessons
    has_many :class_times, through: :lessons
    belongs_to :family
    belongs_to :school
end
