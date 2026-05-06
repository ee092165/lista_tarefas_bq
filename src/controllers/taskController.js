const taskService = require('../services/taskService');
const { unlink, writeFile } = require('node:fs');
const { Buffer } = require('node:buffer');

// const defPath = '';
// testes
const defPath = 'C:/Users/20250484/Documents';

const getRequestBody = (req) => {
	return new Promise((resolve, reject) => {
		let body = '';

		req.on('data', chunk => { body += chunk.toString(); });
		req.on('end', chunk => { resolve(JSON.parse(body)); });
	});
}

const taskFile = (task) => {
	let fname = defPath + `/tasks/${task.id}.json`;
	const data = new Uint8Array(Buffer.from(JSON.stringify(task)));
	writeFile(fname, data, (err) => {
		if (err)
			throw err;
		console.log('File written: ' + fname);
	});
}

const deleteTaskFile = (id) => {
	if (id == undefined)
		return;
	let fname = defPath + `/tasks/${id}.json`;

	unlink(fname, (err) => {
		if (err)
			throw err;
		console.log('File deleted: ' + fname);
	});
}

const listTasks = (req, res) => {
	const tasks = taskService.getTasks();

	res.statusCode = 200;
	res.end(JSON.stringify(tasks));
}

const getTask = async (req, res, id) => {
	const body = await getRequestBody(req);
	const task = taskService.getTask(id);

	if (!task)
	{
		res.statusCode = 404;
		return res.end(JSON.stringify({ message: "404 NOT FOUND" }));
	}

	return res.end(JSON.stringify(task));
}

const createTask = async (req, res) => {
	const body = await getRequestBody(req),
		  task = taskService.addTask(body.title, body.completed, body.id);

	taskFile(task);
	res.statusCode = 200;
	res.end(JSON.stringify(task));
}

const updateTask = async (req, res, id) => {
	const body = await getRequestBody(req);
	const task = taskService.updateTask(id, body.title, body.completed);

	if (!task)
	{
		res.statusCode = 404;
		return res.end(JSON.stringify({ message: "404 NOT FOUND" }));
	}

	taskFile(task);
	res.statusCode = 200;
	return res.end(JSON.stringify(task));
}

const deleteTask = (req, res, id) => {
	const task = taskService.deleteTask(id);

	if (task === null)
	{
		res.statusCode = 404;
		return res.end(JSON.stringify({ message: "404 NOT FOUND" }));
	}

	deleteTaskFile(id);
	res.statusCode = 200;
	return res.end(JSON.stringify({ message: "DELETED" }));
}

const deleteTasks = async (req, res) => {
	const body = await getRequestBody(req);
	if ((body.force ?? false) == false)
	{
		res.statusCode = 401;
		return res.end(JSON.stringify({ message: "You must have 'force' set to true in the body to delete all tasks." }));
	}

	let task;
	for (let i = 1; i < taskService.getIdCounter(); i++)
	{
		task = taskService.deleteTask(i, true);
		if (task !== null)
			deleteTaskFile(i);
	}

	res.statusCode = 200;
	return res.end(JSON.stringify({ message: "DELETED ALL" }));
}

module.exports = {
	listTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask,
	deleteTasks
};
