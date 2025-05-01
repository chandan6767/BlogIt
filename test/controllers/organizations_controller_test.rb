# frozen_string_literal: true

require "test_helper"

class OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization1 = create(:organization)
    @organization2 = create(:organization)
  end

  def test_should_list_all_organizations
    get organizations_url, as: :json

    assert_response :success
    assert_equal 2, response.parsed_body["organizations"].count
  end

  def test_should_return_empty_list_if_no_organizations_exist
    Organization.delete_all

    get organizations_url, as: :json

    assert_response :success
    assert_empty response.parsed_body["organizations"]
  end
end
