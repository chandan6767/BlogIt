# frozen_string_literal: true

class SetDefaultValuesForUpvotesDownvotesAndIsBloggable < ActiveRecord::Migration[7.1]
  def change
    change_column_default :posts, :upvotes, from: nil, to: 0
    change_column_default :posts, :downvotes, from: nil, to: 0
    change_column_default :posts, :is_bloggable, from: nil, to: false
  end
end
