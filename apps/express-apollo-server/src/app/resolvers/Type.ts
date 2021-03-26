import { GraphQLScalarType } from 'graphql';

import { PHOTOS, TAGS, USERS } from '../data';

export const Type = {
  Photo: {
    /**
     * クエリでurlを選択すると対応するリゾルバ関数が呼び出される
     * TODO: Parentのデータ型はどうなるか調べる
     */
    url: (parent: { id: string }) => `http://yoursite.com/img/${parent.id}.jpg`,
    postedBy: (parent) => {
      return USERS.find((u) => u.githubLogin === parent.githubUser);
    },
    taggedUser: (parent) =>
      TAGS.filter((tag) => tag.photoID === parent.id)
        .map((tag) => tag.userID)
        .map((userId) => USERS.find((u) => u.githubLogin === userId)),
  },
  User: {
    postedPhotos: (parent) => {
      return PHOTOS.filter((p) => p.githubUser === parent.githubLogin);
    },
    inPhotos: (parent) => {
      return TAGS.filter((tag) => tag.userID === parent.id)
        .map((tag) => tag.photoID)
        .map((photoId) => PHOTOS.find((p) => p.id === photoId));
    },
  },
  DateTime: new GraphQLScalarType({
    name: `DateTime`,
    description: `A valid date time value.`,
    parseValue: (value) => new Date(value),
    serialize: (value) => new Date(value).toISOString(),
    parseLiteral: (ast: any) => ast.value,
  }),
};
