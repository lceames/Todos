class TodosController < ApplicationController
    def index 
        @todos = Todo.order(:todo_status_id)
        @todo_statuses = TodoStatus.all
        render :index
    end

    def create
        todo = Todo.create(todo_text: params["todo_text"], todo_status_id: 1)
        render json: {"success": "true", "todoId": todo.id}
    end

    def destroy
        Todo.delete(params["id"])
        render json: {"success": "true"}
    end

    def update
        todo = Todo.find(params["id"])   
        todo_status_id = params["todoStatusId"].to_i
        todo.todo_status_id = todo_status_id
        todo.save
    end
end
