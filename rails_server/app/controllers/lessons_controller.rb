class LessonsController < ApplicationController

    def index
        render json: Lesson.all, methods: [:school, :class_time, :student]
    end

    def show
        render json: Lesson.find(params[:id]), methods: [:school, :class_time, :student]
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