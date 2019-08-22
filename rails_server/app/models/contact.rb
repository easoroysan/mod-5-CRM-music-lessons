class Contact < ApplicationRecord
    belongs_to :family
    belongs_to :school

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :relation_to_students, presence: true
    validates :phone_number, presence: true
    validates :email, presence: true
end
