class CreateTodos < ActiveRecord::Migration[5.0]
  def change
    create_table :todos do |t|
      t.string :todo_text, null: false
      t.integer :todo_status_id, null: false
    end
  end
end
