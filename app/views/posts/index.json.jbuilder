# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post, :title, :slug, :created_at, :updated_at, :status

  json.user do
    json.extract! post.user, :name
  end

  json.categories post.categories do |category|
    json.extract! category, :name
  end
end

json.meta do
  json.total_count @posts.total_count
  json.current_page @posts.current_page
  json.total_pages @posts.total_pages
  json.per_page @posts.limit_value
end
