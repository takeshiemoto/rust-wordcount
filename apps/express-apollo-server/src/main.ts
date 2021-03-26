import { ApolloServer, gql } from 'apollo-server-express';
import * as express from 'express';
import { v4 as uuidv4 } from 'uuid';

/**
 * - クエリを作成する場合は必ず同じ名前のリゾルバ関数を定義する
 * - リゾルバはスキーマ内のオブジェクトと同じtypename（この例だとtotalPhotos）として定義
 */
const typeDefs = gql`
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
  }
  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }
  type Mutation {
    postPhoto(name: String!, description: String!): Photo!
  }
`;

type Photo = { name: string; description: string };
// TypeScriptの型定義

// 仮のデータベース
const photoDB = new Map<string, Photo>();

const resolvers = {
  Query: {
    totalPhotos: () => 42,
    allPhotos: () => Array.from(photoDB, ([_, photo]) => photo),
  },
  Mutation: {
    /**
     * @param parent 親オブジェクトへの参照
     * @param args ClientからのVariable
     */
    postPhoto(parent, args: Photo): Photo {
      const id = uuidv4();
      const newPhoto = { id, ...args };

      photoDB.set(id, newPhoto);

      return newPhoto;
    },
  },
};

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
