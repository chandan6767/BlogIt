# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, only: %i[index create show], param: :slug
    resources :categories, only: %i[index create show]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
