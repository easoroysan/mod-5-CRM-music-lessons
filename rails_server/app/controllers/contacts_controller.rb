class ContactsController < ApplicationController

    def index
        render json: Contact.all, methods: [:school, :family]
    end

    def show
        render json: Contact.find(params[:id]), methods: [:school, :family]
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