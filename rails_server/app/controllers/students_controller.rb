class StudentsController < ApplicationController
    before_action :check_authorization

    def index
        render json: Student.all, methods: [:school, :family, :class_times]
    end

    def show
        render json: Student.find(params[:id]), methods: [:school, :family, :class_times]
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