# frozen_string_literal: true

class PostsController < ApplicationController
  DEFAULT_PAGE_SIZE = 5

  before_action :load_post!, only: %i[show update destroy]
  before_action :authorize_post, only: %i[show update destroy]
  after_action :verify_authorized, except: :index

  def index
    @posts = Post.includes(:categories, :user, :organization, :votes)
      .where(organization_id: @current_user.organization_id)
      .yield_self { |scope| filter_by_user(scope) }
      .by_category_ids(params[:category_ids])
      .yield_self { |scope| filter_by_status(scope) }
      .yield_self { |scope| filter_by_title(scope) }
      .order(created_at: :desc)
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

    def filter_by_user(scope)
      if params[:only_my_posts].to_s == "true"
        scope.where(user_id: @current_user.id)
      else
        scope
      end
    end

    def filter_by_status(scope)
      return scope unless params[:status].present? && Post.statuses.key?(params[:status])

      scope.where(status: params[:status])
    end

    def authorize_post
      authorize @post
    end

    def filter_by_title(scope)
      return scope unless params[:title].present?

      title = params[:title].downcase
      adapter = ActiveRecord::Base.connection.adapter_name.downcase

      if adapter.include?("sqlite")
        scope.where("LOWER(title) LIKE ?", "%#{title}%")
      else
        scope.where("title ILIKE ?", "%#{title}%")
      end
    end
end
