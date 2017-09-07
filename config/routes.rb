Rails.application.routes.draw do
  root 'careers#index'

  get 'career_form', to: 'careers#form'

  get 'person_form', to: 'people#form'

  resources :careers do
    resources :people
  end
end
