class LessonsController < ApplicationController
    before_action :check_authorization

    def index
        lessons = []

        @current_user.schools.each do |school| 
            Lesson.all.where("school_id = '#{school.id}'").each do |lesson|
                lessons << lesson
            end
        end

        render json: lessons, methods: [:school, :class_time, :student, :instructor]
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