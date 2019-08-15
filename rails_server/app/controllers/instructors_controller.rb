class InstructorsController < ApplicationController
    before_action :check_authorization

    def index
        render json: Instructor.all, methods: [:schools]
    end

    def show
        render json: Instructor.find(params[:id]), methods: [:schools]
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