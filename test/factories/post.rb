# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    title { Faker::Lorem.sentence[0..49] }
    description { Faker::Lorem.paragraph(sentence_count: 3) }
    is_bloggable { [true, false].sample }
    status { "draft" }
    slug { Faker::Internet.slug }
    upvotes { 0 }
    downvotes { 0 }
    user
    organization
  end
end
