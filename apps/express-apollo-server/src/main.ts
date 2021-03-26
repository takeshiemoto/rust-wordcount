import { ApolloServer, gql } from 'apollo-server-express';
import * as express from 'express';
import { v4 as uuidv4 } from 'uuid';

/**
 * - クエリを作成する場合は必ず同じ名前のリゾルバ関数を定義する
 * - リゾルバはスキーマ内のオブジェクトと同じtypename（この例だとtotalPhotos）として定義
 */
const typeDefs = gql`
  enum PhotoCategory {
    SELFIE
    PORTRAIT
    ACTION
    LANDSCAPE
    GRAPHIC
  }
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
    category: PhotoCategory!
  }
  input PostPhotoInput {
    name: String!
    category: PhotoCategory = PORTRAIT
    description: String
  }
  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }
  type Mutation {
    postPhoto(input: PostPhotoInput): Photo!
  }
`;

// TypeScriptの型定義
type Photo = {
  name: string;
  description: string;
  category: 'SELFIE' | 'PORTRAIT' | 'ACTION' | 'LANDSCAPE' | 'GRAPHIC';
};

// 仮のデータベース
const photoDB = new Map<string, Photo>();
export const findAllPhoto = () => Array.from(photoDB, ([_, photo]) => photo);

const resolvers = {
  Query: {
    totalPhotos: () => findAllPhoto().length,
    allPhotos: () => findAllPhoto(),
  },
  Mutation: {
    /**
     * @param parent 親オブジェクトへの参照
     * @param args ClientからのVariable
     */
    postPhoto(parent, args: { input: Photo }): Photo {
      const id = uuidv4();
      const newPhoto = { id, ...args.input };

      photoDB.set(id, newPhoto);

      return newPhoto;
    },
  },
  Photo: {
    /**
     * クエリでurlを選択すると対応するリゾルバ関数が呼び出される
     */
    url: (parent: { id: string }) => `http://yoursite.com/img/${parent.id}.jpg`,
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
