class CreateTodoStatuses < ActiveRecord::Migration[5.0]
  def change
    create_table :todo_statuses do |t|
      t.integer :todo_status_id, null: false
      t.string :status_text, null: false
    end
  end
end
