module.exports = (resolverName, requestContext, args, error, result) => {
	console.log(JSON.stringify({
		resolverName,
		requestContext,
		args,
		error: !error ? null : {
			message: error.message,
			stack: error.stack.split('\n').slice(1)
		},
		result
	}, null, 2));
};