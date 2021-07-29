Rails.application.routes.draw do
  resources :tasks, except: %i[new], param: :slug
  resources :users, only: %i[create index]
  resource :sessions, only: :create

  root "home#index"
  get '*path', to: 'home#index', via: :all
end