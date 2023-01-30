module.exports = async (requestContext, args) => {
    const { server, now } = requestContext;
    const { name } = args;

    if (name === 'fail') {
        throw new Error('Intentional error.');
    }

    return {
        greeting: `Hello, ${name}!`
    };
};