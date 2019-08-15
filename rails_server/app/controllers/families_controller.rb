class FamiliesController < ApplicationController
    before_action :check_authorization

    def index
        render json: Family.all
    end

    def show
        render json: Family.find(params[:id])
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