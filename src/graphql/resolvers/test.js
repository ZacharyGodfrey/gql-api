module.exports = async (requestContext, args) => {
    const { name } = args;

    if (name === 'fail') {
        throw new Error('Intentional error.');
    }

    return {
        greeting: `Hello, ${name}!`
    };
};