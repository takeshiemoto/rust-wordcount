import { ApolloServer, gql } from 'apollo-server-express';
import * as express from 'express';

/**
 * - クエリを作成する場合は必ず同じ名前のリゾルバ関数を定義する
 * - リゾルバはスキーマ内のオブジェクトと同じtypename（この例だとtotalPhotos）として定義
 */
const typeDefs = gql`
  type Query {
    totalPhotos: Int!
  }
`;

const resolvers = {
  Query: {
    totalPhotos: () => 42
  }
}

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/graphql'})

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to express-apollo-server!' });
});

const port = process.env.port || 3333;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
}).on('error', console.error);
