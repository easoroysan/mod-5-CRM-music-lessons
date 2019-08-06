class ClassTime < ApplicationRecord
    belongs_to :instructor
    belongs_to :school
    has_many :lessons
    has_many :students, through: :lessons
end
