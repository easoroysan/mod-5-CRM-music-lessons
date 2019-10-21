class LessonsController < ApplicationController
    before_action :check_authorization

    def index
        lessons = []

        @current_user.schools.each do |school| 
            Lesson.all.where("school_id = :school_id", { school_id: school_id }).each do |lesson|
                lessons << lesson
            end
        end

        render json: lessons, methods: [:school, :class_time, :student, :instructor, :attendances]
    end

    def show
        if params[:id].split('_')[0] == "student"
            lessons = []
            desired_id = params[:id].split('_')[1]
            @current_user.schools.each do |school|
                Lesson.all.where(["school_id = :school_id and student_id = :student_id", { school_id: school.id, student_id: desired_id }]).each do |lesson|
                    lessons << lesson
                end
            end
            render json: lessons, methods: [:school, :class_time, :student, :instructor, :attendances]
        elsif params[:id].split('_')[0] == "day"
            desired_day = params[:id].split('_')[1]
            class_times = []
            lessons = []

            @current_user.schools.each do |school|
                class_times = ClassTime.joins(:lessons).where( class_times: { school_id: school.id, day: desired_day, active: true } )
                class_times.each do |class_time|
                    Lesson.all.where("class_time_id = :class_time_id", { class_time_id: class_time.id }).each do |desired_lesson|
                        lessons << desired_lesson
                    end
                end
            end

            render json: lessons, methods: [:school, :class_time, :student, :instructor, :attendances]
        else
            lesson = Lesson.find(params[:id])
            if @current_user.schools.include?(lesson.school)
                render json: lesson, methods: [:school, :class_time, :student, :instructor, :attendances]
            else
                render json: {message: 'this lesson does not exist or you do not have access to this lesson'}
            end
        end
    end

    def create
        lesson = Lesson.create(allowed_params)
        render json: lesson, methods: [:school, :class_time, :student, :instructor, :attendances]
    end

    def update
        lesson = Lesson.find(params[:id])
        if @current_user.schools.include?(lesson.school)
            lesson.update(allowed_params)
            render json: lesson, methods: [:school, :class_time, :student, :instructor, :attendances]
        else
            render json: {message: 'this lesson does not exist or you do not have access to this lesson'}
        end
    end

    def destroy
        render plain: 'Hello'
    end

    private

    def allowed_params
        params.permit(
            :school_id,
            :class_time_id,
            :active,
            :instructor_notes,
            :misc_notes,
            :instrument,
            :student_id
        )
    end

end