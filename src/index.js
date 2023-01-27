const gqlPlugin = require('./graphql/plugin');
const server = require('./server');

const { PORT: port = 8080 } = process.env;
const context = {
    db: {
        name: 'fake-db-name'
    }
};

server.use('/graphql', gqlPlugin(context, { enableUI: true }));

server.use((_, res) => res.status(404).end());

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/graphql`);
});