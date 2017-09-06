class PeopleController < ApplicationController
  before_action :set_career, only: [:index, :create]
  before_action :set_person, only: [:show, :update, :destroy]

  def index
    render json: @career.people
  end

  def show
    render json: @person
  end

  def update
    if @person.update(person_params)
      render json: @person
    else
      render_error(@person)
    end
  end

  def create
    @person = @career.people.new(peson_params)
    if @person.save
      render json: @person
    else
      render_error(@person)
    end
  end

  def destroy
    @person.destroy
    render json: { message: 'Person removed' }, status: :ok
  end

  private

    def set_career
      @career = Career.find(params[:career_id])
    end

    def set_person
      @person = Person.find(params[:id])
    end

    def person_params
      params.require(:person).permit(:name, :age)
    end
end
