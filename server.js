const express = require('express');
const actionRouter = require('./data/routes/actionRouter');
// const userRouter = require('./users/userRouter');

const server = express();

server.use(express.json());

server.use('/api/actions', actionRouter);

server.get('/', (res, req) => {
    res.send(`<h2>This is the srint challenge!</h2>`)
});

module.exports = server;