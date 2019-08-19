class StudentsController < ApplicationController
    before_action :check_authorization

    def index
        students = []

        @current_user.schools.each do |school| 
            Student.all.where("school_id = '#{school.id}'").each do |student|
                students << student
            end
        end

        ordered_students = students.sort_by(&:last_name)
        render json: ordered_students, methods: [:school, :family, :class_times]
    end

    def show
        student = Student.find(params[:id])
        if @current_user.schools.include?(student.school)
            render json: student, methods: [:school, :family, :class_times, :lessons]
        else
            render json: {message: 'this student does not exist or you do not have access to this student'}
        end
    end

    def create
        render plain: 'Hello'
    end

    def update
        student = Student.find(params[:id])
        if @current_user.schools.include?(student.school)
            student.update(allowed_params)
            render json: student, methods: [:school, :family, :class_times]
        else
            render json: {message: 'this student does not exist or you do not have access to this student'}
        end
    end

    def destroy
        render plain: 'Hello'
    end

    private

    def allowed_params
        params.permit(
            :first_name,
            :last_name,
            :phone_number,
            :email,
            :date_of_birth,
            :billing_notes,
            :medical_notes,
            :misc_notes
        )
    end

end