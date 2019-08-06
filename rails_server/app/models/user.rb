class User < ApplicationRecord
    has_many :schools, through: :user_schools
end
