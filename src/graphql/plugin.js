const fs = require('fs');
const requireDir = require('require-dir');
const camelcase = require('camelcase');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const wrapResolver = require('../helpers/wrap-resolver');

const schemaPath = require.resolve('./schema.gql');
const schemaText = fs.readFileSync(schemaPath, 'utf-8');
const resolvers = requireDir('./resolvers', { camelcase: true });

module.exports = (serverContext, { enableUI }) => {
	const wrappedResolvers = Object.entries(resolvers).reduce((wrapped, [ name, resolver ]) => ({
		...wrapped,
		[name]: wrapResolver(serverContext, name, resolver)
	}), {});

	return graphqlHTTP({
		schema: buildSchema(schemaText),
		rootValue: wrappedResolvers,
		graphiql: enableUI === true
	});
};