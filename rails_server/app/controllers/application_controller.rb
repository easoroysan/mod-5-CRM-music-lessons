class ApplicationController < ActionController::API

    def check_authorization

        begin
            token = request.headers['Authorization']
            my_secret_key = "9304u'jhgylyfjkdjsrte,.hihrwkljsfdfi4tn4qi3njo.,cmv,;pqwmfwea[;,l4q3f.aqiweyhfdanskjn4q8wreh[;.'uflajsk"
            payload = JWT.decode(token, my_secret_key,true, { algorithm: 'HS384' })[0]
            current_user = User.find(payload['id'])

            if current_user
                if params[:initial]
                    render json: {
                        message: "Success"
                    }
                else
                    return true
                end
            else
                #this means someone has the correct secret but the wrong user id. Likely means hacker?
                render json: {
                    error:true,
                    message: 'Authentication Error dis a hacker?'
                }
            end
        rescue
            render json: {
                error: true,
                message: 'Authentication Error'
            }
        end
        
    end

end
