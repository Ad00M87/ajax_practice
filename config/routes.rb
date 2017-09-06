Rails.application.routes.draw do
  root 'careers#index'

  get 'career_form', to: 'careers#form'

  resources :careers do
    resources :people
  end
end
