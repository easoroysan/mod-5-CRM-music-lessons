class ClassTimesController < ApplicationController

    def index
        render json: ClassTime.all, methods: [:instructor,:school, :students]
    end

    def show
        render json: ClassTime.find(params[:id]), methods: [:instructor,:school, :students]
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