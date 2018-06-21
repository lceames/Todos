// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

const statusDropdownHTML = `<select class="todo-status"></select>`

$(document).ready(function() {
    // create a todo

    $("button#create-todo").click(function (evt) {
        let todoText = $("#todo-text").val();
        $.ajax({
            url: "todos",
            method: "POST",
            data: {
                "todo_text": todoText
            },
            success: function (data) {
                $("#todo-text").val("");
                $("#current-todos").prepend(`<li id=${data.todoId}> ${todoText} ${statusDropdownHTML}<i class='fas fa-times'></i></li>`)
                $(`#current-todos #${data.todoId} .todo-status`).attr("id", data.todoId)

                // fill in select tag with statuses
                $(".todo-status").last().children().each(function () {
                    $(`#${data.todoId}.todo-status`).append(`<option>${this.value}</option>`)
                })

                // bind delete action to new delete button
                $(".fa-times").click(deleteAction);
            }
        })
    });
    
    //delete a todo 

    let deleteAction = function (evt) {
        let todoId = evt.target.parentElement.id

        $.ajax({
            url: `todos/${todoId}`,
            method: "DELETE",
            data: {
                "id": todoId
            },
            success: function () {
                $(`#current-todos #${todoId}`).remove();
            }
        })
    }

    $(".fa-times").click(deleteAction);

    // update a todo

    $(".todo-status").change(function (evt) {
        let newStatusId = this.options[this.selectedIndex].id
        let todoId = this.parentElement.id
        let todoStatus = this.value

        $.ajax({
            url: `todos/${todoId}`,
            method: "PATCH",
            data: {
                "todoStatusId": newStatusId
            }
        })
    })



    // When DOM loads update select tags with correct todo status

    $("#current-todos li").each(function (todo) {
        let todoId = this.id;
        let todoStatus = this.attributes.status.value;
        $(`#${todoId}.todo-status`).val(todoStatus);
    });

});