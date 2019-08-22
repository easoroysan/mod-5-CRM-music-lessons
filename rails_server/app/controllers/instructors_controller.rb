class InstructorsController < ApplicationController
    before_action :check_authorization

    def index
        user_instructors = Instructor.all.select{ |instructor| (instructor.schools & @current_user.schools).present? }

        ordered_instructors = user_instructors.sort_by(&:last_name)
        
        render json: ordered_instructors, methods: [:schools, :class_times]
    end

    def show
        instructor = Instructor.find(params[:id])
        if (instructor.schools & @current_user.schools).present?
            render json: instructor, methods: [:schools, :class_times]
        else
            render json: {message: 'this instructor does not exist or you do not have access to this instructor'}
        end
    end

    def create
        instructor = Instructor.create(allowed_params)
        params[:schools].each do | school_id |
            InstructorSchool.create( instructor: instructor, school_id: school_id )
        end
        
        render json: instructor, methods: [:schools, :class_times]
    end

    def update
        instructor = Instructor.find(params[:id])
        if (instructor.schools & @current_user.schools).present?

            
            testing_ids = instructor.schools.map{ |each_school| each_school[:id] }
            params[:schools].each do |school|
                connection = InstructorSchool.where(["school_id = :school_id and instructor_id = :instructor_id", { school_id: school[:id],instructor_id: params[:id] }])
                if !testing_ids.include?(school[:id])
                    InstructorSchool.create( instructor_id: instructor[:id], school_id: school[:id] )
                end
            end
            all_connections = InstructorSchool.where(["instructor_id = :instructor_id", { instructor_id: params[:id] }])
            school_ids = params[:schools].map do |school|
                school[:id]
            end
            all_connections.each do |connection|
                if !school_ids.include?(connection.school_id)
                    lessonChecker = instructor.lessons.select do |lesson|
                        lesson[:school_id] == connection.school_id
                    end
                    if lessonChecker.length <= 0
                        connection.destroy
                    end
                end
            end

            instructor.update(allowed_params)
            if !instructor.active
                ClassTime.all.where(["instructor_id = :instructor_id", { instructor_id: params[:id] }]).each do |class_time|
                    class_time.update( active: false)
                    if class_time.lessons.length > 0
                        class_time.lessons.each do |lesson|
                            lesson.update(active: false)
                        end
                    end
                end
            end
            render json: instructor, methods: [:schools, :class_times]
        else
            render json: {message: 'this instructor does not exist or you do not have access to this instructor'}
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
            :instrument_1,
            :instrument_2,
            :instrument_3,
            :phone_number,
            :emergency_number,
            :email,
            :date_of_birth,
            :billing_address,
            :pay_rate,
            :biography,
            :misc_notes,
            :active
        )
    end

end