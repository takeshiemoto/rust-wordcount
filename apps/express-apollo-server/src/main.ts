import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import expressPlayground from 'graphql-playground-middleware-express';
import { MongoClient } from 'mongodb';

import { DB_KEYS } from './constatns';
import { resolvers } from './resolver';
import { typeDefs } from './type-defs';

const start = async () => {
  const app = express();

  /**
   * @see https://cloud.mongodb.com/v2/60608b905e106469dad7c1f6#clusters
   */
  const DB_URL = process.env.NX_DB_URL;
  const client = await MongoClient.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const githubToken = req.headers.authorization;
      const currentUser = await db
        .collection(DB_KEYS.USERS)
        .findOne({ githubToken });
      return {
        db,
        currentUser,
      };
    },
  });
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
