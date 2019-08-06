class Lesson < ApplicationRecord
    belongs_to :school
    belongs_to :student
    belongs_to :class_time
end
