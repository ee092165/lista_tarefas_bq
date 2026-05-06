const { createTask } = require("../models/taskModel");

let tasks = [], idCounter = 1, emptyId = [];

const addTask = (title) => {
	let id = Number(emptyId.length > 0 ? emptyId.pop() : idCounter++);
	const task = createTask(id, title);
	tasks.push(task);
	return task;
}

const getTasks = () => tasks;

const getTask = (id) => {
	const task = tasks.find(t => t.id == id);
	return !task ? null : task;
}

const updateTask = (id, title, completed) => {
	const task = tasks.find(t => t.id == id);
	if (!task)
		return null;
	if (title !== undefined)
		task.title = title;
	if (completed !== undefined)
		task.completed = completed;
	return task;
}

const deleteTask = (id) => {
	if (id === (idCounter - 1))
		idCounter--;
	else
		emptyId.push(id);
	const index = tasks.findIndex(t => t.id == id);
	return index === -1 ? null : tasks.splice(index, 1)[0];
}

module.exports = {
	getTasks,
	getTask,
	addTask,
	updateTask,
	deleteTask
};