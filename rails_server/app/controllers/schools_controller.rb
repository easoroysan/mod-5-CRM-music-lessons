class SchoolsController < ApplicationController

    def index
        render json: School.all, methods: [:users, :instructors]
    end

    def show
        render json: School.find(params[:id]), methods: [:users, :instructors]
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