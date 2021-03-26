import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import expressPlayground from 'graphql-playground-middleware-express';

import { resolvers } from './app/resolvers';
import { typeDefs } from './type-defs';

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/graphql' });

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to express-apollo-server!' });
});

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

const port = process.env.port || 3333;
app
  .listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  })
  .on('error', console.error);
