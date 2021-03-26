import { v4 as uuidv4 } from 'uuid';

import { PHOTOS, TAGS, USERS } from './data';
import { Photo } from './types';

// 仮のデータベース
const photoDB = [...PHOTOS];
const usersDB = [...USERS];
const tagsDB = [...TAGS];

export const resolvers = {
  Query: {
    totalPhotos: () => photoDB.length,
    allPhotos: () => photoDB,
  },
  Mutation: {
    /**
     * @param parent 親オブジェクトへの参照
     * @param args ClientからのVariable
     */
    postPhoto(parent, args: { input: Photo }): Photo {
      const id = uuidv4();
      const newPhoto = { id, ...args.input };

      photoDB.push(newPhoto);

      return newPhoto;
    },
  },
  Photo: {
    /**
     * クエリでurlを選択すると対応するリゾルバ関数が呼び出される
     * TODO: Parentのデータ型はどうなるか調べる
     */
    url: (parent: { id: string }) => `http://yoursite.com/img/${parent.id}.jpg`,
    postedBy: (parent) => {
      return usersDB.find((u) => u.githubLogin === parent.githubUser);
    },
    taggedUser: (parent) =>
      tagsDB
        .filter((tag) => tag.photoID === parent.id)
        .map((tag) => tag.userID)
        .map((userId) => usersDB.find((u) => u.githubLogin === userId)),
  },
  User: {
    postedPhotos: (parent) => {
      return photoDB.filter((p) => p.githubUser === parent.githubLogin);
    },
    inPhotos: (parent) => {
      return tagsDB
        .filter((tag) => tag.userID === parent.id)
        .map((tag) => tag.photoID)
        .map((photoId) => photoDB.find((p) => p.id === photoId));
    },
  },
};
