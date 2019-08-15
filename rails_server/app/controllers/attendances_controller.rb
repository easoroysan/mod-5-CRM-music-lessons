class AttendancesController < ApplicationController
    before_action :check_authorization

    def index
        render json: Attendance.all, methods: [:lessons]
    end

    def show
        render json: Attendance.find(params[:id]), methods: [:lessons]
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