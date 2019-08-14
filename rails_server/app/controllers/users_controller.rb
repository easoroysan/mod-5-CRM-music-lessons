class UsersController < ApplicationController

    def login
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            render json: {message: "Confirmed", token: "this should be a real token"}
        else
            render json: {message: "Incorrect username or password", token: "ZGlzIHRva2VuIGJlIGZha2UgOjM="}
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