import { GraphQLScalarType, GraphQLScalarTypeConfig, Kind } from 'graphql';
import { v4 as uuidv4 } from 'uuid';

import { DB_KEYS } from './constatns';
import { authorizeWithGithub } from './functions';
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
      context.db.collection(DB_KEYS.PHOTOS).estimatedDocumentCount(),
    allPhotos: (parent, args, context) =>
      context.db.collection(DB_KEYS.PHOTOS).find().toArray(),
    totalUsers: (parent, args, context) =>
      context.db.collection(DB_KEYS.PHOTOS).estimatedDocumentCount(),
    allUsers: (parent, args, context) =>
      context.db.collection(DB_KEYS.PHOTOS).find().toArray(),
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
    githubAuth: async (parent, { code }, { db }) => {
      const {
        message,
        access_token,
        avatar_url,
        login,
        name,
      } = await authorizeWithGithub({
        client_id: '26b0bc1027a8ec1f4e14',
        client_secret: 'b18a561867e1af642846e78b95b76d2a590d78b2',
        code,
      });
      if (message) {
        throw new Error(message);
      }
      const latestUserInfo = {
        name,
        githubLogin: login,
        githubToken: access_token,
        avatar: avatar_url,
      };

      const {
        ops: [user],
      } = await db
        .collection('users')
        .replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true });

      return {
        user,
        token: access_token,
      };
    },
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
