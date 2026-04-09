const taskService = require('../services/taskService');

const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => { resolve(JSON.parse(body)); });
    })
}

const listTasks = (req, res) => {
    const tasks = taskService.getTasks();

    res.statusCode = 200;
    res.end(JSON.stringify(tasks));
}

const createTask = async (req, res) => {
    const body = await getRequestBody(req);
    const task = taskService.addTask(body.title);

    res.statusCode = 201;
    res.end(JSON.stringify(task));
}

const updateTask = async (req, res, id) => {
    const body = await getRequestBody(req);
    const task = taskService.updateTask(id, body.title);
    
    if (!task)
    {
        res.statusCode = 404;
        return res.end(JSON.stringify({ message: "404 NOT FOUND"}));
    }

    return res.end(JSON.stringify(task));
}

const deleteTask = (req, res, id) => {
    const task = taskService.deleteTask(id);

    if (!task)
    {
        res.statusCode = statusCodes.NotFound;
        return res.end(JSON.stringify({ message: "404 NOT FOUND"}));
    }

    return res.end(JSON.stringify({ message: "REMOVED"}));
}

module.exports = {
    listTasks,
    createTask,
    updateTask,
    deleteTask
};