class Lesson < ApplicationRecord
    belongs_to :school
    belongs_to :student
    belongs_to :class_time
    has_one :instructor, through: :class_time
    has_many :attendances

    validates :instrument, presence: true

end
