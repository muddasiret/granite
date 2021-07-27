Rails.application.routes.draw do
  resources :tasks, only: [:index, :create], param: :slug

  root "home#index"
  get '*path', to: 'home#index', via: :all
end