# 创建书签表 - Create bookmarks table
class CreateBookmarks < ActiveRecord::Migration[7.0]
  def change
    create_table :bookmarks do |t|
      t.string :title, null: false
      t.text :description
      t.string :url, null: false
      t.string :image_url
      t.string :category, null: false
      t.text :tags # JSON string for SQLite compatibility
      t.boolean :featured, default: false
      t.boolean :published, default: true
      t.integer :views_count, default: 0
      t.integer :likes_count, default: 0
      t.references :user, null: true, foreign_key: true
      t.datetime :published_at
      
      t.timestamps
    end
    
    add_index :bookmarks, :category
    add_index :bookmarks, :featured
    add_index :bookmarks, :published
    add_index :bookmarks, :published_at
    # Note: SQLite doesn't support GIN indexes, tags will be stored as JSON text
  end
end
