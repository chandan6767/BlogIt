# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post, :title, :slug, :created_at

  json.user do
    json.extract! post.user, :name
  end

  json.categories post.categories do |category|
    json.extract! category, :name
  end
end
