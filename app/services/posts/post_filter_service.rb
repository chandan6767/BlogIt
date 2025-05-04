# frozen_string_literal: true

module Posts
  class PostFilterService
    attr_reader :params, :current_user

    def initialize(params:, current_user:)
      @params = params
      @current_user = current_user
    end

    def filter
      scope = Post.includes(:categories, :user, :organization, :votes)
        .where(organization_id: current_user.organization_id)

      scope = filter_by_user(scope)
      scope = scope.by_category_ids(params[:category_ids])
      scope = filter_by_status(scope)
      scope = filter_by_title(scope)

      scope
    end

    private

      def filter_by_user(scope)
        return scope unless params[:only_my_posts].to_s == "true"

        scope.where(user_id: current_user.id)
      end

      def filter_by_status(scope)
        return scope unless params[:status].present? && Post.statuses.key?(params[:status])

        scope.where(status: params[:status])
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
end
