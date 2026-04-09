const http = require('http');

const taskRoutes = require('./routes/taskRoutes');

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    taskRoutes(req, res);
});

const PORT = 8900;
server.listen(PORT, ()=>console.log(`Servidor aberto em http://localhost:${PORT}`));