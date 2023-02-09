const express = require('express');

const server = express();

server.set('json spaces', 2);

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use(({ method }, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST');
	res.header('x-powered-by', '');

	method === 'OPTIONS' ? res.status(200).end() : next();
});

module.exports = server;