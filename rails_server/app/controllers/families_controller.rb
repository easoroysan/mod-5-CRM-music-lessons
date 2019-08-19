class FamiliesController < ApplicationController
    before_action :check_authorization

    def index
        families = []

        @current_user.schools.each do |school| 
            Family.all.where("school_id = '#{school.id}'").each do |family|
                families << family
            end
        end

        ordered_families = families.sort_by(&:family_name)

        render json: ordered_families, methods: [:school, :students, :contacts]
    end

    def show
        family = Family.find(params[:id])
        if @current_user.schools.include?(family.school)
            render json: family, methods: [:school, :students, :contacts, :lessons, :class_times, :instructors]
        else
            render json: {message: 'this family does not exist or you do not have access to this family'}
        end
    end

    def create
        render plain: 'Hello'
    end

    def update
        family = Family.find(params[:id])
        if @current_user.schools.include?(family.school)
            family.update(allowed_params)
            render json: family, methods: [:school, :students, :contacts, :lessons, :class_times, :instructors]
        else
            render json: {message: 'this family does not exist or you do not have access to this family'}
        end
    end

    def destroy
        render plain: 'Hello'
    end

    private

    def allowed_params
        params.permit(
            :family_name,
            :misc_notes
        )
    end

end