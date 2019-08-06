class Family < ApplicationRecord
    has_many :students
    has_many :contacts
end
