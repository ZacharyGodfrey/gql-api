module.exports = async (requestContext, args) => {
	const { server, now } = requestContext;
	const { greeting } = args;

	if (greeting === 'fail') {
		throw new Error('Intentional error.');
	}

	server.greeting = greeting;

	return {
		greeting: server.greeting
	};
};