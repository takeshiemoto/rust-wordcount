import { gql } from 'apollo-server-express';

/**
 * - クエリを作成する場合は必ず同じ名前のリゾルバ関数を定義する
 * - リゾルバはスキーマ内のオブジェクトと同じtypename（この例だとtotalPhotos）として定義
 */
export const typeDefs = gql`
  type User {
    githubLogin: ID!
    name: String
    avatar: String
    postedPhotos: [Photo!]!
    inPhotos: [Photo!]!
  }
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
    category: PhotoCategory!
    postedBy: User!
    taggedUser: [User!]!
  }
  enum PhotoCategory {
    SELFIE
    PORTRAIT
    ACTION
    LANDSCAPE
    GRAPHIC
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
