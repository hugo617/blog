# 创建书签表 - Create bookmarks table
class CreateBookmarks < ActiveRecord::Migration[7.0]
  def change
    create_table :bookmarks do |t|
      t.string :title, null: false
      t.text :description
      t.string :url, null: false
      t.string :image_url
      t.string :category, null: false
      t.text :tags, array: true, default: []
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
    add_index :bookmarks, :tags, using: 'gin'
  end
end
