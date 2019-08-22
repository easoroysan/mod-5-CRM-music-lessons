class ContactsController < ApplicationController
    before_action :check_authorization

    def index
        contacts = []

        @current_user.schools.each do |school| 
            Contact.all.where("school_id = '#{school.id}'").each do |contact|
                contacts << contact
            end
        end

        ordered_contacts = contacts.sort_by(&:last_name)
        render json: ordered_contacts, methods: [:school, :family]
    end

    def show
        contact = Contact.find(params[:id])
        if @current_user.schools.include?(contact.school)
            render json: contact, methods: [:school, :family]
        else
            render json: {message: 'this contact does not exist or you do not have access to this contact'}
        end
    end

    def create
        contact = Contact.create(allowed_params)
        render json: contact, methods: [:school, :family]
    end

    def update
        contact = Contact.find(params[:id])
        if @current_user.schools.include?(contact.school)
            contact.update(allowed_params)
            render json: contact, methods: [:school, :family]
        else
            render json: {message: 'this contact does not exist or you do not have access to this contact'}
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
            :relation_to_student,
            :phone_number,
            :emergency_number,
            :email,
            :billing_address,
            :family_id,
            :school_id
        )
    end

end