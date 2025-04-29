# frozen_string_literal: true

class PostsController < ApplicationController
  DEFAULT_PAGE_SIZE = 5

  before_action :load_post!, only: %i[show update]

  def index
    @posts = Post.includes(:categories, :user, :organization)
      .where(organization_id: @current_user.organization_id)
      .by_category_ids(params[:category_ids])
      .order(created_at: :desc)
      .page(params[:page])
      .per(params[:per_page] || DEFAULT_PAGE_SIZE)
  end

  def create
    post = Post.create!(post_params.merge(user_id: @current_user.id, organization_id: @current_user.organization_id))
    render_notice(t("successfully_created", name: post.title))
  end

  def show
  end

  def update
    @post.update!(post_params)
    render_notice(t("successfully_updated", name: @post.title))
  end

  private

    def post_params
      params.require(:post)
        .permit(:title, :description, :status, category_ids: [],)
    end

    def load_post!
      @post = Post.includes(:categories, :user).find_by!(
        slug: params[:slug],
        organization_id: @current_user.organization_id)
    end
end
