# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.order(created_at: :desc)
    render_json({ posts: })
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
