# frozen_string_literal: true

class PostsController < ApplicationController
  DEFAULT_PAGE_SIZE = 5

  def index
    @posts = Post.includes(:categories, :user, :organization)
      .by_category_ids(params[:category_ids])
      .order(created_at: :desc)
      .page(params[:page])
      .per(params[:per_page] || DEFAULT_PAGE_SIZE)
  end

  def create
    post = Post.create!(post_params)
    render_notice(t("successfully_created", name: post.title))
  end

  def show
    @post = Post.includes(:categories, :user).find_by!(slug: params[:slug])
  end

  private

    def post_params
      params.require(:post)
        .permit(:title, :description, :user_id, :organization_id, category_ids: [])
        .reverse_merge(user_id: 1, organization_id: 1)
    end
end
