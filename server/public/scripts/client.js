class Task {
    constructor(id, description, completed) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }
}

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

function getTasksFromServer() {
    console.log('getTasksFromServer() - doing nothing');
}