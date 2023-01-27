module.exports = (resolverName, requestContext, args, error, result) => {
    const { message, stack } = error || {};

    console.log('==========');
    console.log(`Resolver : ${resolverName}`);
    console.log('----------');
    console.log(`Context  : ${JSON.stringify(requestContext, null, 2)}`);
    console.log('----------');
    console.log(`Args     : ${JSON.stringify(args, null, 2)}`);
    console.log('----------');
    console.log(`Error    : ${!error ? null : { message, stack }}`);
    console.log('----------');
    console.log(`Result   : ${JSON.stringify(result, null, 2)}`);
    console.log('==========');
};