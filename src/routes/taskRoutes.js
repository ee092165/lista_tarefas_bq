const taskController = require('../controllers/taskController');

module.exports = (req, res) => {
    const url = req.url, method = req.method;

    if (url === '/tasks')
    {
        if (method === 'GET')
            return taskController.listTasks(req, res);
        if (method === 'POST')
            return taskController.createTask(req, res);
    }

    if (url.startsWith('/tasks'))
    {
        const id = url.split('/')[2];
        if (method === 'PUT')
            return taskController.updateTask(req, res, id);
        if (method === 'DELETE')
            return taskController.deleteTask(req, res, id);
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ message: "404 NOT FOUND"}));
}