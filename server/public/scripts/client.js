
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
    const taskDescription = $('#new-task-description').val();
    if (taskDescription) {
        $.ajax({
            method: 'POST',
            url: '/tasks',
            data: { description: taskDescription }
        }).then(function(responseStatus) {
            getTasksFromServer();
            $('#new-task-description').val('');
        }).catch(function() {
            const message = `Could not create task '${taskDescription}'.`;
            serverError(message);
        });
    }
}

// Request that the server change the status of a given TO-DO task to completed
function markTaskComplete() {
    const task = taskFromDOM(this);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${task.id}`
    }).then(function (taskList) {
        getTasksFromServer(taskList);
    }).catch(function () {
        const message = `Could not mark task '${task.description}' as complete.`;
        serverError(message);
    });
}

// Request that the server delete a given TO-DO task
function deleteTask() {
    const task = taskFromDOM(this);
    deleteTaskDialog(task)
    .then((value) => {
        if (value) {
            $.ajax({
                method: 'DELETE',
                url: `/tasks/${task.id}`,
            }).then(function (taskList) {
                getTasksFromServer(taskList);
                deleteTaskSuccess(task);
            }).catch(function () {
                deleteTaskError(task);
            });
        }
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
        const message = 'Could not retrieve list of TO-DO tasks.';
        serverError(message);
    });
}

// Update the DOM to display the list of TO-DO tasks
function displayTasks(taskList) {
    $('#task-list').empty();
    for (let task of taskList) {
        const $taskRow = $(`
        <tr>
            <td class="task-description">${task.description}</td>
            <td><button class="btn btn-secondary btn-sm mark-complete-button">complete</button></td>
            <td><button class="btn btn-danger btn-sm delete-button">delete</button></td>
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

// Retieves data about a TODO task by parsing the DOM starting with a 'this' 
// from a button element. Returns the task's 'id' and 'description' in an 
// object.
function taskFromDOM(thisButton) {
    const $taskRow = $(thisButton).parent().parent();
    const id = $taskRow.data('task-id');
    const description = $taskRow.find('.task-description').text();
    const outputObject = {
        id: id,
        description: description,
    };
    return outputObject;
}

// Displays a warning dialog for when the user tries to delete a task
// Note: Technically this returns a callback to a function that will produce 
// this dialog. Possibly this is an example of a JavaScript promise?
function deleteTaskDialog(task) {
    const dialogFunction = swal({
        icon: 'warning',
        title: 'Delete this task?',
        text: `Description: ${task.description}`,
        buttons: {
            cancel: true,
            deleteButton: {
                text: "Delete!",
                value: true,
                closeModal: false,
            }
        },
    });
    return dialogFunction;
}

// Displays a success dialog when a TODO task is successfully deleted
function deleteTaskSuccess(task) {
    swal({
        icon: "success",
        title: 'Deleted',
        text: `Description: ${task.description}`,
    });
}

// Displays an error dialog when a TODO task could not be deleted. Also logs an
// error message on the browser console.
function deleteTaskError(task) {
    const errorMessage = `[Server Error 500] Could not delete: ${task.description}`;
    console.log(errorMessage);
    swal({
        icon: "error",
        title: 'Uh-Oh 😱',
        text: errorMessage,
    });
}

// Displays an error dialog when there was a problem on the server. Also logs an
// error message on the browser console.
function serverError(message) {
    const fullMessage = `[Server Error 500] ${message}`;
    console.log(fullMessage);
    swal({
        icon: "error",
        title: 'Server Error',
        text: fullMessage,
    });
}