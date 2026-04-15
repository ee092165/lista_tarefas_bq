const taskController = require('../controllers/taskController');

module.exports = (req, res) =>
{
	const url = req.url, method = req.method;
	const m = (m) => m === method; // Shortcut

	if (url === '/tasks')
	{
		if (m('GET'))
			return taskController.listTasks(req, res);
		if (m('POST'))
			return taskController.createTask(req, res);
	}

	if (url.startsWith('/tasks/'))
	{
		const id = url.split('/')[2];

		if (m('GET'))
			return taskController.getTask(req, res, id);
		if (m('PUT'))
			return taskController.updateTask(req, res, id);
		if (m('DELETE'))
			return taskController.deleteTask(req, res, id);
	}

	res.statusCode = 404;
	return res.end(JSON.stringify({ message: "404 NOT FOUND" }));
}