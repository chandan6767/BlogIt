class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :description
      t.integer :upvotes
      t.integer :downvotes
      t.boolean :is_bloggable
      t.timestamps
    end
  end
end
