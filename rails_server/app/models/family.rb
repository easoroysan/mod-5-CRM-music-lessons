class Family < ApplicationRecord
    has_many :students
    has_many :contacts
    belongs_to :school
end
