class Student < ApplicationRecord
    has_many :lessons
    has_many :class_times, through: :lessons
    belongs_to :family
    belongs_to :school

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :date_of_birth, presence: true
end
