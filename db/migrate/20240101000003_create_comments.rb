class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.text :body, null: false
      t.boolean :approved, default: false
      t.references :user, null: false, foreign_key: true
      t.references :post, null: false, foreign_key: true

      t.timestamps
    end

    add_index :comments, :approved
    add_index :comments, [:post_id, :approved]
    add_index :comments, :user_id
  end
end
