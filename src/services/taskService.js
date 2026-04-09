const { createTask } = require('../models/taskModel');

let tasks = [], idC = 1;
const taskF = (t => t.id === id);

const getTasks = () => tasks;

const addTask = (title) => {
    const task = createTask(idC++, title);
    tasks.push(task);
    return task;
}

const updateTask = (id, title) => {
    const task = tasks.find(taskF);
    if (!task)
        return null;
    task.title = title;
    return task;
}

const deleteTask = (id) => {
    const index = tasks.findIndex(taskF);
    return index === -1 ? null : tasks.splice(index, 1)[0];
}

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask
};