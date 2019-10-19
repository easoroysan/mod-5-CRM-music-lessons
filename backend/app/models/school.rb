class School < ApplicationRecord
    has_many :user_schools
    has_many :users, through: :user_schools
    has_many :instructor_schools
    has_many :instructors, through: :instructor_schools
    has_many :families
end
