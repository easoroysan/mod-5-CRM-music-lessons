class ApplicationController < ActionController::API

    attr_reader :current_user

    def check_authorization

        begin
            token = request.headers['Authorization']
            my_secret_key = "9304u'jhgylyfjkdjsrte,.hihrwkljsfdfi4tn4qi3njo.,cmv,;pqwmfwea[;,l4q3f.aqiweyhfdanskjn4q8wreh[;.'uflajsk"
            payload = JWT.decode(token, my_secret_key,true, { algorithm: 'HS384' })[0]
            @current_user = User.find(payload['id'])

            if current_user
                if params[:initial]
                    render json: @current_user, methods: [:schools]
                else
                    return true
                end
            else
                #this means someone has the secret or user was deleted
                render json: {
                    error:true,
                    message: 'Authorization Error'
                }
            end
        rescue
            render json: {
                error: true,
                message: 'Authorization Error'
            }
        end
        
    end

end
