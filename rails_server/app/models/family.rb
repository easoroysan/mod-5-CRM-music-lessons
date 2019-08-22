class Family < ApplicationRecord
    has_many :students
    has_many :contacts
    has_many :lessons, through: :students
    has_many :class_times, through: :lessons
    has_many :instructors, through: :class_times
    belongs_to :school

    validates :family_name, presence: true
end
