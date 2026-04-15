const http = require('node:http');
const PORT = 8900;
const taskRoutes	 = require('./routes/taskRoutes.js'),
	  taskModel		 = require('./models/taskModel.js'),
	  taskService	 = require('./services/taskService.js'),
	  taskController = require('./controllers/taskController.js');

const server = http.createServer((req, res) => {
	res.setHeader('Content-Type', 'application/json');

	taskRoutes(req, res);
});

server.listen(PORT, ()=> console.log(`Server at http://localhost:${PORT}`));
