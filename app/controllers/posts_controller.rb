# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.order(created_at: :desc)
    render_json({ posts: })
  end

  def create
    post = Post.new(post_params)
    post.save!
    render_notice(t("successfully_created"))
  end

  def show
    post = Post.find_by!(slug: params[:slug])
    render_json({ post: })
  end

  private

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
