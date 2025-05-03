# frozen_string_literal: true

class Vote < ApplicationRecord
  VALID_VOTE_SCORE = [-1, 1].freeze

  belongs_to :user
  belongs_to :post

  validates :value, inclusion: { in: VALID_VOTE_SCORE }
  validates :user_id, uniqueness: { scope: :post_id }

  after_save :update_post_bloggable_status
  after_destroy :update_post_bloggable_status

  def upvote?
    value == 1
  end

  def downvote?
    value == -1
  end

  private

    def update_post_bloggable_status
      post.update_bloggable_status!
    end
end
