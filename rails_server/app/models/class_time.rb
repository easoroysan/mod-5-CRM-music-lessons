class ClassTime < ApplicationRecord
    belongs_to :instructor
    belongs_to :school
    has_many :lessons
    has_many :students, through: :lessons
    has_many :families, through: :students
    has_many :contacts, through: :families
end
