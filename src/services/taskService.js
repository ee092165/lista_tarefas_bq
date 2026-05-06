const createTask = require("../models/taskModel");

let tasks = [], idCounter = 1, emptyId = [];

const addTask = (title, completed, id) => {
	const task = createTask(id ?? Number(emptyId.length > 0 ? emptyId.pop() : idCounter++), title ?? "Foobar", completed ?? false);
	tasks.push(task);
	return task;
}

const getIdCounter = () => idCounter;
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

const deleteTask = (id, over = false) => {
	if (over)
		idCounter = 1;
	else if (id === (idCounter - 1))
		idCounter--;
	else
		emptyId.push(id);
	const index = tasks.findIndex(t => t.id == id);
	return index === -1 ? null : tasks.splice(index, 1)[0];
}

module.exports = {
	getTasks,
	getIdCounter,
	getTask,
	addTask,
	updateTask,
	deleteTask
};
