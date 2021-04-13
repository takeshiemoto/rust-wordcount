import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar DateTime
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
    created: DateTime
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
    totalUsers: Int!
    allUsers: [User!]!
  }
  type Mutation {
    postPhoto(input: PostPhotoInput): Photo!
    githubAuth(code: String!): AuthPayload!
  }
  type AuthPayload {
    token: String!
    user: User!
  }
`;
