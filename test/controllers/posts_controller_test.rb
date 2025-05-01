# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @organization = @user.organization
    @category = create(:category)
    @post = create(:post, user: @user, organization: @organization, categories: [@category])
    @headers = headers(@user)
  end

  def test_should_get_index
    get posts_path, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_kind_of Array, response_json[:posts]
    slugs = response_json[:posts].map { |post| post["slug"] }
    assert_includes slugs, @post.slug
  end

  def test_should_filter_posts_by_category
    get posts_path(category_ids: [@category.id]), headers: @headers
    assert_response :success
    response_json = response.parsed_body
    slugs = response_json[:posts].map { |post| post["slug"] }
    assert_includes slugs, @post.slug
  end

  def test_should_filter_posts_by_user
    get posts_path(only_my_posts: true), headers: @headers
    assert_response :success
    response_json = response.parsed_body
    slugs = response_json[:posts].map { |post| post["slug"] }
    assert_includes slugs, @post.slug
  end

  def test_should_create_post
    post_params = {
      post: {
        title: "New Post",
        description: "A description",
        status: "draft",
        category_ids: [@category.id]
      }
    }
    post posts_path, params: post_params, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", name: post_params[:post][:title]), response_json["notice"]
  end

  def test_should_show_post
    get post_path(slug: @post.slug), headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal @post.id, response_json[:post][:id]
  end

  def test_should_update_post
    patch post_path(slug: @post.slug), params: {
      post: { title: "Updated Title" }
    }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_updated", name: "Updated Title"), response_json["notice"]
    assert_equal "Updated Title", @post.reload.title
  end

  def test_should_destroy_post
    assert_difference "Post.count", -1 do
      delete post_path(slug: @post.slug), headers: @headers
    end
    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_deleted", name: @post.title), response_json["notice"]
  end

  def test_should_filter_posts_by_status
    draft_post = create(:post, user: @user, organization: @organization, categories: [@category])
    published_post = create(
      :post, status: "published", user: @user, organization: @organization,
      categories: [@category])

    get posts_path, params: { status: "draft" }, headers: @headers
    assert_response :success

    response_json = response.parsed_body
    slugs = response_json[:posts].map { |p| p[:slug] }

    assert_includes slugs, draft_post.slug
    refute_includes slugs, published_post.slug
  end
end
