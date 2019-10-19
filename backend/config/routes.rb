Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

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

  get '*path', to: "application#react_app", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
