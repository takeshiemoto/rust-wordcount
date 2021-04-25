import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar DateTime
  type User {
    githubLogin: ID!
    githubToken: String!
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
    userID: String!
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
    me: User
  }
  type Mutation {
    addFakeUsers(count: Int = 1): [User!]
    fakeUserAuth(githubLogin: ID!): AuthPayload!
    postPhoto(input: PostPhotoInput): Photo!
    githubAuth(code: String!): AuthPayload!
  }
  type AuthPayload {
    token: String!
    user: User!
  }
`;
