# frozen_string_literal: true

class VotesController < ApplicationController
  before_action :load_post!

  def create
    @vote = @post.votes.find_or_initialize_by(user: current_user)

    if @vote.value == vote_params[:value].to_i
      @vote.destroy
      head :no_content
    else
      if @vote.update(value: vote_params[:value])
        render json: { success: true, net_votes: @post.net_votes, is_bloggable: @post.is_bloggable }
      else
        render json: { success: false, errors: @vote.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  private

    def load_post!
      @post = Post.find_by!(slug: params[:post_slug])
    end

    def vote_params
      params.require(:vote).permit(:value)
    end
end
