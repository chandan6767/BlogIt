# frozen_string_literal: true

class PostsController < ApplicationController
  DEFAULT_PAGE_SIZE = 5

  before_action :load_post!, only: %i[show update destroy]
  before_action :authorize_post, only: %i[show update destroy]
  after_action :verify_authorized, except: %i[index bulk_update bulk_destroy]

  def index
    filtered_scope = Posts::PostFilterService.new(
      params: params,
      current_user: @current_user
    ).filter

    @posts = filtered_scope.order(created_at: :desc)
      .page(params[:page])
      .per(params[:per_page] || DEFAULT_PAGE_SIZE)

    @user_votes_by_post_id = Vote
      .where(post_id: @posts.map(&:id), user_id: @current_user.id)
      .pluck(:post_id, :value)
      .to_h
  end

  def create
    post = Post.new(
      post_params.merge(
        user_id: @current_user.id,
        organization_id: @current_user.organization_id))
    authorize post
    post.save!
    render_notice(t("successfully_created", name: post.title))
  end

  def show
  end

  def update
    @post.update!(post_params)
    render_notice(t("successfully_updated", name: @post.title))
  end

  def destroy
    post_title = @post.title
    @post.destroy!
    render_notice(t("successfully_deleted", name: post_title))
  end

  def bulk_update
    posts = Post.where(slug: bulk_update_params[:slugs], organization_id: @current_user.organization_id)

    posts.update_all(status: bulk_update_params[:status])

    render_notice(t("successfully_updated", name: "#{posts.size} posts"))
  end

  def bulk_destroy
    posts = Post.where(slug: bulk_destroy_params[:slugs], organization_id: @current_user.organization_id)

    count = posts.destroy_all.count

    render_notice(t("successfully_deleted", name: "#{count} posts"))
  end

  private

    def post_params
      params.require(:post)
        .permit(:title, :description, :status, category_ids: [])
    end

    def load_post!
      @post = Post.includes(:categories, :user).find_by!(
        slug: params[:slug],
        organization_id: @current_user.organization_id)
    end

    def authorize_post
      authorize @post
    end

    def bulk_update_params
      params.permit(:status, slugs: [])
    end

    def bulk_destroy_params
      params.permit(slugs: [])
    end
end
