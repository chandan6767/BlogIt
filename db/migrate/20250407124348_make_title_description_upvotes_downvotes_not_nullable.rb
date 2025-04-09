# frozen_string_literal: true

class MakeTitleDescriptionUpvotesDownvotesNotNullable < ActiveRecord::Migration[7.1]
  def change
    change_column_null :posts, :title, false
    change_column_null :posts, :description, false
    change_column_null :posts, :upvotes, false
    change_column_null :posts, :downvotes, false
  end
end
