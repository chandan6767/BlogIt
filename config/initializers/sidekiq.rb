# frozen_string_literal: true

if Rails.env.test?
  require "sidekiq/testing"
  Sidekiq::Testing.inline!
end

redis_url = ENV.fetch("REDIS_URL", "redis://localhost:6379/12")

Sidekiq.configure_server do |config|
  config.redis = { url: redis_url, size: 10, network_timeout: 5 }
end

Sidekiq.configure_client do |config|
  config.redis = { url: redis_url, size: 1, network_timeout: 5 }
end
