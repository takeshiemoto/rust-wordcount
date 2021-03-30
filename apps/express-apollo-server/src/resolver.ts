import { GraphQLScalarType } from 'graphql';

import { Photo, Resolvers, User } from './types/genereted';

export const resolvers: Resolvers = {
  Query: {
    totalPhotos: (parent, args, context) =>
      context.db.collection('photos').estimatedDocumentCount(),
    allPhotos: (parent, args, context) =>
      context.db.collection('photos').find().toArray(),
    totalUsers: (parent, args, context) =>
      context.db.collection('users').estimatedDocumentCount(),
    allUsers: (parent, args, context) =>
      context.db.collection('users').find().toArray(),
  },
  Mutation: {
    postPhoto: () => {
      return {} as Photo;
    },
  },
  Photo: {
    url: (parent) => `http://yoursite.com/img/${parent.id}.jpg`,
    postedBy: () => {
      // return USERS.find((u) => u.githubLogin === parent.id);
      return {} as User;
    },
    // taggedUser: (parent) =>
    //   TAGS.filter((tag) => tag.photoID === parent.id)
    //     .map((tag) => tag.userID)
    //     .map((userId) => USERS.find((u) => u.githubLogin === userId)),
    taggedUser: () => [],
  },
  User: {
    // postedPhotos: (parent) => {
    //   return PHOTOS.filter((p) => p.githubUser === parent.githubLogin);
    // },
    postedPhotos: () => [],
    inPhotos: () => [],
    // inPhotos: (parent) => {
    //   return TAGS.filter((tag) => tag.userID === parent.id)
    //     .map((tag) => tag.photoID)
    //     .map((photoId) => PHOTOS.find((p) => p.id === photoId));
    // },
  },
  DateTime: new GraphQLScalarType({
    name: `DateTime`,
    description: `A valid date time value.`,
    parseValue: (value) => new Date(value),
    serialize: (value) => new Date(value).toISOString(),
    parseLiteral: (ast: any) => ast.value,
  }),
};
