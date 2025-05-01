# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    name { Faker::Lorem.words(number: 2).join(" ").titleize }
  end
end
