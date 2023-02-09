const express = require('express');

const gqlPlugin = require('./graphql/plugin');

module.exports = (serverContext) => {
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

	server.use('/graphql', gqlPlugin(serverContext, {
		enableUI: !context.isProduction
	}));

	server.use((_, res) => res.status(404).end());

	return server;
};