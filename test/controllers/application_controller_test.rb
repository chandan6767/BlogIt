# frozen_string_literal: true

require "test_helper"
require "mocha/minitest"

class DummyController < ApplicationController
  public :log_exception # make private method public for testing
end

class ApplicationControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @headers = headers(@user)
    @controller = DummyController.new
  end

  def test_should_authenticate_user_with_valid_credentials
    get posts_path, headers: @headers, as: :json
    assert_response :success
  end

  def test_should_reject_authentication_with_invalid_token
    @headers["X-Auth-Token"] = "invalid_token"

    get posts_path, headers: @headers, as: :json
    assert_response :unauthorized
    assert_match I18n.t("session.could_not_auth"), response.parsed_body[:error]
  end

  def test_should_reject_authentication_with_missing_credentials
    get posts_path, headers: {}, as: :json
    assert_response :unauthorized
    assert_match I18n.t("session.could_not_auth"), response.parsed_body[:error]
  end

  def test_should_return_404_for_missing_record
    get post_path(slug: "non-existent-post"), headers: @headers, as: :json
    assert_response :not_found
    assert_match "Couldn't find Post", response.parsed_body[:error]
  end

  def test_should_return_422_for_validation_errors
    post posts_path,
      params: { post: { title: "", description: "" } },
      headers: @headers,
      as: :json

    assert_response :unprocessable_entity
    assert_includes response.parsed_body[:error], "Title can't be blank"
    assert_includes response.parsed_body[:error], "Description can't be blank"
  end

  def test_should_return_422_for_missing_parameters
    post posts_path, params: { post: { title: "Test" } }, headers: @headers, as: :json
    assert_response :unprocessable_entity
  end

  def test_should_return_500_for_missing_parameters
    post posts_path, params: {}, headers: @headers, as: :json
    assert_response :internal_server_error
  end

  def test_should_return_422_for_record_invalid
    post posts_path,
      params: { post: { title: "", description: "" } },
      headers: @headers,
      as: :json

    assert_response :unprocessable_entity
    assert_equal "Title can't be blank, Title is invalid, Description can't be blank",
      response.parsed_body[:error]
  end

  def test_should_return_500_for_generic_exception
    PostsController.any_instance.stubs(:index).raises(StandardError.new("Something broke"))

    get posts_path, headers: @headers, as: :json
    assert_response :internal_server_error
    assert_match "Something broke", response.parsed_body[:error]
  end

  def test_should_log_exception_details
    exception = StandardError.new("Something went wrong")
    exception.set_backtrace(["line 1", "line 2"])

    Rails.logger.expects(:info).with("StandardError")
    Rails.logger.expects(:info).with("Something went wrong")
    Rails.logger.expects(:info).with("line 1\nline 2")

    @controller.send(:log_exception, exception)
  end
end
