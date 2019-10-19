class InstructorSchool < ApplicationRecord
  belongs_to :instructor
  belongs_to :school
end
