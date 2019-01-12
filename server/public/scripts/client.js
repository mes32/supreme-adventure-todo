// class Task {
//     constructor(id, description, completed) {
//         this.id = id;
//         this.description = description;
//         this.completed = completed;
//     }
// }

$(onReady);
function onReady() {
    addAllListeners();
    getTasksFromServer();
}

function addAllListeners() {
    $('#add-new-task').on('click', addNewTask);
    $('#task-list').on('click', '.mark-complete-button', markTaskComplete);
    $('#task-list').on('click', '.delete-button', deleteTask);
}

function addNewTask() {
    console.log('pressed addNewTask() - doing nothing');
}

function markTaskComplete() {
    console.log('pressed markTaskComplete() - doing nothing');
}

function deleteTask() {
    console.log('pressed deleteTask() - doing nothing');
}

// Request the current list of all TO-DO tasks from the server via GET
function getTasksFromServer() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(taskList) {
        displayTasks(taskList);
    }).catch(function(serverError) {
        const errorMessage = `Could not get TO-DO tasks. Server error: ${serverError}`;
        console.log(errorMessage);
        alert(errorMessage);
    });
}

// Update the DOM to display the list of TO-DO tasks
function displayTasks(taskList) {
    console.log(taskList);
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