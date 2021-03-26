export type Photo = {
  id: string;
  name: string;
  description?: string;
  category: 'SELFIE' | 'PORTRAIT' | 'ACTION' | 'LANDSCAPE' | 'GRAPHIC';
  githubUser: string;
};

export type User = {
  githubLogin: string;
  name: string;
};

export type Tag = {
  photoID: string;
  userID: string;
};
