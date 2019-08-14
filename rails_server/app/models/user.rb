class User < ApplicationRecord
    has_many :user_schools
    has_many :schools, through: :user_schools
    has_secure_password

    def auth_token
        my_secret_key = "9304u'jhgylyfjkdjsrte,.hihrwkljsfdfi4tn4qi3njo.,cmv,;pqwmfwea[;,l4q3f.aqiweyhfdanskjn4q8wreh[;.'uflajsk"
        JWT.encode({ id: self.id, type: 'user'}, my_secret_key,'HS384')
    end 

    # def as_json(*)
    #     super.except('password_digest')
    # end

end
