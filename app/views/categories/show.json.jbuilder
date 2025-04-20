# frozen_string_literal: true

json.category do
  json.extract! @category, :id, :name, :created_at, :updated_at

  json.posts @category.posts do |post|
    json.extract! post, :id, :title, :description, :created_at, :updated_at
  end
end
