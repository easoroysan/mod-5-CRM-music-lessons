Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope :api do
    resources :schools
    resources :users
    resources :instructors
    resources :class_times
    resources :lessons
    resources :students
    resources :families
    resources :contacts
    resources :attendances

    post '/login', to: 'users#authenticate'
    post '/authorize', to: 'application#check_authorization'
  end

  root to: "static#react_app"
  get '*path', to: "static#react_app"

end
