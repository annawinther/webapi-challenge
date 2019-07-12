const express = require('express');
const actionRouter = require('./data/routes/actionRouter');
const projectRouter = require('./data/routes/projectRouter');

const server = express();

server.use(express.json());

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', (res, req) => {
    res.send(`<h2>This is the srint challenge!</h2>`)
});


module.exports = server;