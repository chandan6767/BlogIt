# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @category = create(:category)
    @headers = headers(@user)
  end

  def test_should_list_categories
    get categories_path, headers: @headers, as: :json
    assert_response :success

    response_json = response.parsed_body
    assert response_json["categories"].any?
    assert_includes response_json["categories"].map { |cat| cat["id"] }, @category.id
  end

  def test_should_create_category
    category_params = { category: { name: "New Category" } }

    assert_difference "Category.count" do
      post categories_path, params: category_params, headers: @headers
    end

    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", name: category_params[:category][:name]), response_json["notice"]
  end

  def test_should_show_category
    # get category_path(@category), headers: @headers
    # assert_response :success
    # response_json = response.parsed_body
    # assert_equal @category.id, response_json[:category][:id]
    post = create(:post, categories: [@category])
    get category_path(@category), headers: @headers
    assert_response :success
    response_json = response.parsed_body
    category_data = response_json[:category]
    post_ids = category_data[:posts].map { |post| post["id"] }
    assert_includes post_ids, post.id
  end
end
