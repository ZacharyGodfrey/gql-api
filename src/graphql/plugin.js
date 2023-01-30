const fs = require('fs');
const requireAll = require('require-all');
const camelcase = require('camelcase');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const wrapResolver = require('../helpers/wrap-resolver');

module.exports = (serverContext, { enableUI }) => {
    const schemaText = fs.readFileSync(require.resolve('./schema.gql'), 'utf-8');
    const resolvers = requireAll({
        dirname: `${__dirname}/resolvers`,
        map: (name) => camelcase(name)
    });

    const wrappedResolvers = {};

    Object.entries(resolvers).forEach(([ name, resolver ]) => {
        wrappedResolvers[name] = wrapResolver(serverContext, name, resolver);
    });

    return graphqlHTTP({
        schema: buildSchema(schemaText),
        rootValue: wrappedResolvers,
        graphiql: enableUI === true
    });
};