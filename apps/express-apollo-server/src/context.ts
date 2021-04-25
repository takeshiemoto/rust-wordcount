import { Db } from 'mongodb';

import { User } from './types/genereted';

export type Context = {
  db: Db;
  currentUser: User;
};
