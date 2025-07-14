class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.string :slug, null: false
      t.text :excerpt
      t.boolean :published, default: false
      t.datetime :published_at
      t.references :user, null: false, foreign_key: true
      t.integer :views_count, default: 0
      t.integer :comments_count, default: 0

      t.timestamps
    end

    add_index :posts, :slug, unique: true
    add_index :posts, :published
    add_index :posts, :published_at
    add_index :posts, :user_id
  end
end
