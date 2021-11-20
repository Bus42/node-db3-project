const express = require('express');
const morgan = require('morgan');

const SchemeRouter = require('./schemes/scheme-router.js');

const server = express();

const middlewares = [
    morgan('dev'),
    express.json(),
]

server.use(middlewares);
server.use('/api/schemes', SchemeRouter);

module.exports = server;