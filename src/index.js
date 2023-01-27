const gqlPlugin = require('./graphql/plugin');
const server = require('./server');

const port = process.env.PORT || 8080;
const context = {
    db: {
        name: process.env.DB_NAME || 'db_name'
    }
};

server.use('/graphql', gqlPlugin(context, { enableUI: true }));

server.use((_, res) => res.status(404).end());

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/graphql`);
});