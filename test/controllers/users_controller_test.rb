# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
  end

  def test_should_create_user_with_valid_attributes
    user_params = {
      user: {
        name: "Test User",
        email: "test@example.com",
        password: "secure123",
        password_confirmation: "secure123",
        organization_id: @organization.id
      }
    }

    assert_difference("User.count", 1) do
      post users_path, params: user_params, as: :json
    end

    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", name: "Test User"), response_json["notice"]
  end

  def test_should_return_422_with_invalid_user_params
    invalid_params = {
      user: {
        name: "",
        email: "not-an-email",
        password: "short",
        password_confirmation: "mismatch",
        organization_id: nil
      }
    }

    assert_no_difference("User.count") do
      post users_path, params: invalid_params, as: :json
    end

    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_match "can't be blank", response_json["error"]
  end

  def test_should_return_422_when_missing_required_param
    post users_path, params: {}, as: :json

    assert_response :internal_server_error
    assert_match "param is missing", response.parsed_body["error"]
  end
end
