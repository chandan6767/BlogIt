# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, only: %i[index create show update destroy], param: :slug do
      resource :vote, only: %i[create destroy], controller: :votes
      collection do
        patch :bulk_update
        delete :bulk_destroy
      end
    end
    resources :categories, only: %i[index create show]
    resources :organizations, only: %i[index]
    resources :users, only: %i[create]
    resource :session, only: %i[create destroy]
    resource :vote, only: %i[create destroy]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
