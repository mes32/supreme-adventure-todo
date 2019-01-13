
// Main function. Runs as soon as page loads.
$(onReady);
function onReady() {
    addAllListeners();
    getTasksFromServer();
}

// Attach all event handlers
function addAllListeners() {
    $('#add-new-task').on('click', addNewTask);
    $('#task-list').on('click', '.mark-complete-button', markTaskComplete);
    $('#task-list').on('click', '.delete-button', deleteTask);
}

// Request that the server add a new TO-DO task
function addNewTask() {
    const description = $('#new-task-description').val();
    if (description) {
        $.ajax({
            method: 'POST',
            url: '/tasks',
            data: { description: description }
        }).then(function(responseStatus) {
            getTasksFromServer();
            $('#new-task-description').val('');
        }).catch(function() {
            const errorMessage = 'Server error 500: Could not add a new TO-DO task.';
            console.log(errorMessage);
            alert(errorMessage);
        });
    }
}

// Request that the server change the status of a given TO-DO task to completed
function markTaskComplete() {
    const id = $(this).parent().parent().data('task-id');
    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`
    }).then(function (taskList) {
        getTasksFromServer(taskList);
    }).catch(function () {
        const errorMessage = 'Server error 500: Could not mark TO-DO task as completed.';
        console.log(errorMessage);
        alert(errorMessage);
    });
}

// Request that the server delete a given TO-DO task
function deleteTask() {
    const id = $(this).parent().parent().data('task-id');
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${id}`
    }).then(function (taskList) {
        getTasksFromServer(taskList);
    }).catch(function () {
        const errorMessage = 'Server error 500: Could not delete TO-DO task';
        console.log(errorMessage);
        alert(errorMessage);
    });
}

// Request the current list of all TO-DO tasks from the server via GET
function getTasksFromServer() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(taskList) {
        displayTasks(taskList);
    }).catch(function() {
        const errorMessage = 'Server error 500: Could not get TO-DO tasks.';
        console.log(errorMessage);
        alert(errorMessage);
    });
}

// Update the DOM to display the list of TO-DO tasks
function displayTasks(taskList) {
    $('#task-list').empty();
    for (let task of taskList) {
        const $taskRow = $(`
        <tr>
            <td>${task.description}</td>
            <td><button class="mark-complete-button">complete</button></td>
            <td><button class="delete-button">delete</button></td>
        </tr>
        `);
        $taskRow.data('task-id', task.id);
        if (task.completed) {
            $taskRow.toggleClass('completed');
            $taskRow.find('button.mark-complete-button').attr('disabled', 'disabled');
        }
        $('#task-list').append($taskRow);
    }
}