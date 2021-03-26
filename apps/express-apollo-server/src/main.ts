import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';

import { resolvers } from './resolver';
import { typeDefs } from './type-defs';

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/graphql' });

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to express-apollo-server!' });
});

const port = process.env.port || 3333;
app
  .listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  })
  .on('error', console.error);
