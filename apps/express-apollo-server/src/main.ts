import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import { MongoClient } from 'mongodb';

import { resolvers } from './app/resolvers';
import { typeDefs } from './type-defs';

const start = async () => {
  const app = express();

  const DB_URL = process.env.NX_DB_URL;
  const client = await MongoClient.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();
  const context = { db };

  const server = new ApolloServer({ typeDefs, resolvers, context });
  server.applyMiddleware({ app });

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
};

start();
