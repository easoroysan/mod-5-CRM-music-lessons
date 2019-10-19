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
        class_time = ClassTime.create(allowed_params)
        render json: class_time, methods: [:school, :lessons, :students, :instructor, :contacts]
    end

    def update
        class_time = ClassTime.find(params[:id])
        if @current_user.schools.include?(class_time.school)
            if !allowed_params['active'] && class_time.lessons.length > 0
                class_time.lessons.each do |lesson|
                    Lesson.update(lesson.id, active: false)
                end
            end
            class_time.update(allowed_params)
            render json: class_time, methods: [:school, :lessons, :students, :instructor, :contacts]
        else
            render json: {message: 'this class time does not exist or you do not have access to this class time'}
        end
    end

    def destroy
        render plain: 'Hello'
    end

    private

    def allowed_params
        params.permit(
            :active,
            :instructor_id,
            :start_time,
            :end_time,
            :school_id,
            :day
        )
    end

end