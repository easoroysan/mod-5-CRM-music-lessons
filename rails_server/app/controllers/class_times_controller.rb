class ClassTimesController < ApplicationController
    before_action :check_authorization

    def index
        render plain: 'Hello'
    end

    def show
        class_times = []

        @current_user.schools.each do |school|
            ClassTime.all.where(["school_id = :school_id and instructor_id = :instructor_id", { school_id: school.id, instructor_id: params[:id] }]).each do |class_time|
                class_times << class_time
            end
        end
        
        render json: class_times, methods: [:school, :lessons, :students, :instructor, :contacts]

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