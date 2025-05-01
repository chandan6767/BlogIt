# frozen_string_literal: true

require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @organization = create(:organization)
    @category = create(:category)
    @post = create(:post, user: @user, organization: @organization, categories: [@category])
  end

  def test_post_should_be_valid_with_valid_attributes
    assert @post.valid?
  end

  def test_post_should_be_invalid_without_title
    @post.title = ""
    assert_not @post.valid?
    assert_includes @post.errors[:title], "can't be blank"
  end

  def test_post_should_be_invalid_with_long_title
    @post.title = "a" * (Post::MAX_TITLE_LENGTH + 1)
    assert_not @post.valid?
  end

  def test_post_should_be_invalid_without_description
    @post.description = ""
    assert_not @post.valid?
    assert_includes @post.errors[:description], "can't be blank"
  end

  def test_post_should_be_invalid_with_long_description
    @post.description = "a" * (Post::MAX_DESCRIPTION_LENGTH + 1)
    assert_not @post.valid?
  end

  def test_post_should_have_valid_title_format
    @post.title = "!!!" # no alphanumeric characters
    assert_not @post.valid?
  end

  def test_post_should_be_invalid_with_nil_bloggable_flag
    @post.is_bloggable = nil
    assert_not @post.valid?
  end

  def test_slug_is_generated_before_create
    post = build(:post, title: "Hello World", user: @user, organization: @organization)
    post.save!
    assert_equal "hello-world", post.slug
  end

  def test_slug_is_unique_and_incremented_for_duplicates
    first_post = Post.create!(title: "Duplicate Title", description: "desc", user: @user, organization: @organization)
    second_post = Post.create!(title: "Duplicate Title", description: "desc", user: @user, organization: @organization)
    assert_match /duplicate-title(-\d+)?/, second_post.slug
    assert_not_equal first_post.slug, second_post.slug
  end

  def test_updating_title_does_not_change_slug
    original_slug = @post.slug
    @post.update!(title: "Updated Title")
    assert_equal original_slug, @post.reload.slug
  end

  def test_cannot_change_slug_manually
    @post.slug = "new-slug"
    assert_not @post.valid?
    assert_includes @post.errors[:slug], I18n.t("post.slug.immutable")
  end

  def test_by_category_ids_scope_returns_matching_posts
    matching_posts = Post.by_category_ids([@category.id])
    assert_includes matching_posts, @post
  end

  def test_by_category_ids_scope_returns_all_if_ids_blank
    all_posts = Post.by_category_ids(nil)
    assert_includes all_posts, @post
  end

  def test_post_should_be_invalid_with_unknown_status
    assert_raises ArgumentError do
      @post.status = "archived"
      @post.save!
    end
  end

  def test_is_bloggable_should_be_present
    @post.is_bloggable = nil
    assert_not @post.valid?
  end

  def test_values_of_created_at_and_updated_at
    post = build(:post)
    assert_nil post.created_at
    assert_nil post.updated_at

    post.save!
    assert_not_nil post.created_at
    assert_equal post.created_at, post.updated_at

    post.update!(title: "Updated Title for Timestamp Test")
    assert_not_equal post.created_at, post.updated_at
  end

  def test_post_should_not_be_valid_without_user
    post = build(:post)
    post.user = nil
    assert_not post.valid?
    assert_includes post.errors.full_messages, "User must exist"
  end
end
