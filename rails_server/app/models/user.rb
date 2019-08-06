class User < ApplicationRecord
    has_many :user_schools
    has_many :schools, through: :user_schools
end
