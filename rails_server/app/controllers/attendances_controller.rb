class AttendancesController < ApplicationController
    before_action :check_authorization

    def index
        render json: Attendance.all, methods: [:lessons]
    end

    def show
        render json: Attendance.find(params[:id]), methods: [:lessons]
    end

    def create
        attendance = Attendance.create(allowed_params)
        lesson = Lesson.find(attendance.lesson_id)
        render json: lesson, methods: [:school, :class_time, :student, :instructor, :attendances]
    end

    def update
        attendance = Attendance.find(params[:id])
        attendance.update(allowed_params)
        lesson = Lesson.find(attendance.lesson_id)
        render json: lesson, methods: [:school, :class_time, :student, :instructor, :attendances]
    end

    def destroy
        attendance = Attendance.find(params[:id])

    end

    private

    def allowed_params
        params.permit(
            :school_id,
            :lesson_id,
            :date,
            :status,
            :make_up,
            :cancelled_date
        )
    end

end