module.exports = async (_, { name }) => {
    if (name === 'fail') {
        throw new Error('Intentional error.');
    }

    return {
        greeting: `Hello, ${name}!`
    };
};