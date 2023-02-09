const server = require('./server');

const port = process.env.PORT || 8080;
const context = {
	isProduction: process.env.NODE_ENV === 'production',
	db: {
		name: process.env.DB_NAME || 'db_name'
	},
	greeting: 'Hello'
};

server(context).listen(port, () => {
	console.log(`Server is running at http://localhost:${port}/graphql`);
});