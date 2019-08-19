class InstructorsController < ApplicationController
    before_action :check_authorization

    def index
        user_instructors = Instructor.all.select{ |instructor| (instructor.schools & @current_user.schools).present? }

        ordered_instructors = user_instructors.sort_by(&:last_name)
        
        render json: ordered_instructors, methods: [:schools]
    end

    def show
        instructor = Instructor.find(params[:id])
        if (instructor.schools & @current_user.schools).present?
            render json: instructor
        else
            render json: {message: 'this instructor does not exist or you do not have access to this instructor'}
        end
    end

    def create
        render plain: 'Hello'
    end

    def update
        instructor = Instructor.find(params[:id])
        if (instructor.schools & @current_user.schools).present?
            instructor.update(allowed_params)
            render json: instructor
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
            :misc_notes
        )
    end

end