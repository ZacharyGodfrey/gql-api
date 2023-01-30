const fs = require('fs');
const requireAll = require('require-all');
const camelcase = require('camelcase');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const wrapResolvers = require('./helpers/wrap-resolvers');

module.exports = (serverContext, { enableUI }) => {
    const schemaText = fs.readFileSync(require.resolve('./schema.gql'), 'utf-8');
    const resolvers = requireAll({
        dirname: `${__dirname}/resolvers`,
        map: (name) => camelcase(name)
    });

    return graphqlHTTP({
        schema: buildSchema(schemaText),
        rootValue: wrapResolvers(serverContext, resolvers),
        graphiql: enableUI === true
    });
};