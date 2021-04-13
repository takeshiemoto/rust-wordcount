import { GraphQLScalarType, GraphQLScalarTypeConfig, Kind } from 'graphql';
import { v4 as uuidv4 } from 'uuid';

import { Photo, PhotoCategory, Resolvers, User } from './types/genereted';

const config: GraphQLScalarTypeConfig<Date, string> = {
  name: `DateTime`,
  description: `A valid date time value.`,
  parseValue: (value: string) => new Date(value),
  serialize: (value: string) => new Date(value).toISOString(),
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
};

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
  Mutation: {
    postPhoto: async (parent, args, { db }) => {
      const result = await db.collection<Photo>('photos').insertOne({
        id: uuidv4(),
        name: args.input.name,
        description: args.input.description,
        category: PhotoCategory.Action,
        postedBy: undefined,
        taggedUser: undefined,
        url: '',
      });
      return result.ops[0];
    },
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
  DateTime: new GraphQLScalarType(config),
};
