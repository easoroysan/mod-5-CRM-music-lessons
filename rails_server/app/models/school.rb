class School < ApplicationRecord
    has_many :users, through: :user_schools
    has_many :instructors, through: :instructor_schools
end
