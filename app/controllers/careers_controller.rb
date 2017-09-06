class CareersController < ApplicationController
  before_action :set_career, only: [:show, :update, :destroy]

  def index
    @careers = Career.all
  end

  def show
    render partial: 'career', locals: { career: @career }
  end

  def form
    @career = params[:id] ? Career.find(params[:id]) : Career.new
    render partial: 'form'
  end

  def create
    @career = Career.new(career_params)
    if @career.save
      render json: @career
    else
      render_error(@career)
    end
  end

  def update
    if @career.update(career_params)
      render json: @career
    else
      render_error(@career)
    end
  end

  def destroy
    @career.destroy
    render json: { message: 'Career removed' }, status: 200
  end

  private

    def set_career
      @career = Career.find(params[:id])
    end

    def career_params
      params.require(:career).permit(:title, :field)
    end

end
