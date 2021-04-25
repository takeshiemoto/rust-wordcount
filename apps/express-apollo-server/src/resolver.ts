import { GraphQLScalarType, GraphQLScalarTypeConfig, Kind } from 'graphql';
import fetch from 'node-fetch';
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
    me: (parent, args, { currentUser }) => {
      return currentUser;
    },
  },
  Photo: {
    id: (parent) => parent.id,
    url: (parent) => `/img/photos/${parent.id}.jpg`,
    postedBy: (parent, args, { db }) => {
      return db
        .collection(DB_KEYS.USERS)
        .findOne({ githubLogin: parent.userID });
    },
    // taggedUser: (parent) =>
    //   TAGS.filter((tag) => tag.photoID === parent.id)
    //     .map((tag) => tag.userID)
    //     .map((userId) => USERS.find((u) => u.githubLogin === userId)),
    taggedUser: () => [],
  },
  Mutation: {
    addFakeUsers: async (root, { count }, { db }) => {
      const randomUserApi = `https://randomuser.me/api/?result=${count}`;
      const { results } = await fetch(randomUserApi).then((res) => res.json());
      const users = results.map((r) => ({
        githubLogin: r.login.username,
        name: `${r.name.first} ${r.name.last}`,
        avatar: r.picture.thumbnail,
        githubToken: r.login.sha1,
      }));
      await db.collection(DB_KEYS.USERS).insertMany(users);

      return users as User[];
    },
    fakeUserAuth: async (parent, { githubLogin }, { db }) => {
      const user = await db
        .collection<User>(DB_KEYS.USERS)
        .findOne({ githubLogin });

      if (!user) {
        throw new Error(`Cannot find user with githubLogin ${githubLogin}`);
      }

      return {
        token: user.githubToken,
        user,
      };
    },
    githubAuth: async (parent, { code }, { db }) => {
      const {
        message,
        access_token,
        avatar_url,
        login,
        name,
      } = await authorizeWithGithub({
        client_id: process.env.NX_CLIENT_ID,
        client_secret: process.env.NX_CLIENT_SECRET,
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
    postPhoto: async (parent, args, { db, currentUser }) => {
      if (!currentUser) {
        throw new Error(`only an authorize user can post a photo`);
      }
      const result = await db.collection<Photo>('photos').insertOne({
        id: uuidv4(),
        name: args.input.name,
        description: args.input.description,
        category: PhotoCategory.Action,
        postedBy: undefined,
        taggedUser: undefined,
        url: '',
        created: new Date(),
        userID: currentUser.githubLogin,
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
