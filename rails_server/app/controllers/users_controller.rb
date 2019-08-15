class UsersController < ApplicationController
    before_action :check_authorization, except: :authenticate

    def authenticate
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            render json: {message: "Confirmed", token: user.auth_token, current_user: user, schools: user.schools.map { |school| school.id } }
        else
            render json: {message: "Incorrect username or password", token: "bWVzc2FnZSBmcm9tIG1hbmFnZW1lbnQ6.IGRpcyB0b2tlbiBiZSBmYWtlIDop"}
        end
    end

    def index
        render json: User.all, methods: [:schools]
    end

    def show
        render json: User.find(params[:id]), methods: [:schools]
    end

    def create
        render plain: 'Hello'
    end

    def edit
        render plain: 'Hello'
    end

    def update
        render plain: 'Hello'
    end

    def destroy
        render plain: 'Hello'
    end

end