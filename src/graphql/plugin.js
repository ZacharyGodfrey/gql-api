const fs = require('fs');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const resolvers = require('./resolvers');

const schemaText = fs.readFileSync(require.resolve('./schema.gql'), 'utf-8');

module.exports = (context, { enableUI }) => graphqlHTTP({
    schema: buildSchema(schemaText),
    rootValue: resolvers(context),
    graphiql: enableUI === true
});