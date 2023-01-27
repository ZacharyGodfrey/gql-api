const fs = require('fs');
const requireAll = require('require-all');
const camelcase = require('camelcase');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schemaText = fs.readFileSync(require.resolve('./schema.gql'), 'utf-8');
const resolvers = requireAll({
    dirname: `${__dirname}/resolvers`,
    map: (name) => camelcase(name)
});

const logRequest = (resolverName, requestContext, args, error, result) => {
    const { message, stack } = error || {};
    const displayError = !error ? null : { message, stack: stack.split('\n').slice(1) };

    console.log('==========');
    console.log(`Resolver : ${resolverName}`);
    console.log('----------');
    console.log(`Context  : ${JSON.stringify(requestContext, null, 2)}`);
    console.log('----------');
    console.log(`Args     : ${JSON.stringify(args, null, 2)}`);
    console.log('----------');
    console.log(`Error    : ${JSON.stringify(displayError, null, 2)}`);
    console.log('----------');
    console.log(`Result   : ${JSON.stringify(result, null, 2)}`);
    console.log('==========');
};

const wrapResolvers = (serverContext, rawResolvers) => {
    const methods = {};

    Object.entries(rawResolvers).forEach(([ name, resolver ]) => {
        methods[name] = async (args) => {
            let result = null;
            let error = null;
            const requestContext = {
                server: serverContext,
                now: new Date().toISOString()
            };

            try {
                result = await resolver(requestContext, args);
            } catch (e) {
                error = e;

                console.error(e);
            }

            logRequest(name, requestContext, args, error, result);

            if (error) {
                throw error;
            } else {
                return result;
            }
        };
    });

    return methods;
};

module.exports = (context, { enableUI }) => graphqlHTTP({
    schema: buildSchema(schemaText),
    rootValue: wrapResolvers(context, resolvers),
    graphiql: enableUI === true
});