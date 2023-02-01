module.exports = (resolverName, requestContext, args, error, result) => {
    const displayError = !error ? null : {
        message: error.message,
        stack: error.stack.split('\n').slice(1)
    };

    console.log('==========');
    console.log(` Resolver: ${resolverName}`);
    console.log('----------');
    console.log(`  Context: ${JSON.stringify(requestContext, null, 2)}`);
    console.log('----------');
    console.log(`     Args: ${JSON.stringify(args, null, 2)}`);
    console.log('----------');
    console.log(`    Error: ${JSON.stringify(displayError, null, 2)}`);
    console.log('----------');
    console.log(`   Result: ${JSON.stringify(result, null, 2)}`);
    console.log('==========');
};