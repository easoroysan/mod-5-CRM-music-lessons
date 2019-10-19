class Attendance < ApplicationRecord
    belongs_to :lesson
    belongs_to :school
end
