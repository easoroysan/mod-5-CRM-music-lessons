class UsersController < ApplicationController

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