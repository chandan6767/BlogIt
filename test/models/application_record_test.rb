# frozen_string_literal: true

require "test_helper"

class ApplicationRecordTest < ActiveSupport::TestCase
  class TestModel < ApplicationRecord
    self.table_name = "users"

    validates :name, presence: true
  end

  def setup
    @test_model = TestModel.new
  end

  def test_errors_to_sentence_returns_proper_error_message
    @test_model.valid?
    assert_equal "Name can't be blank", @test_model.errors_to_sentence
  end
end
