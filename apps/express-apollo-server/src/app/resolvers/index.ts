import { Mutation } from './Mutation';
import { Query } from './Query';
import { Type } from './Type';

export const resolvers = {
  Query,
  Mutation,
  ...Type,
};
