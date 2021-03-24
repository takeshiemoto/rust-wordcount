import { Query, Resolver } from '@nestjs/graphql';

import { Recipe } from './recipe';

const RECIPE_TABLE = [
  {
    id: '1',
    title: '焼きそば',
  },
  {
    id: '2',
    title: 'お好み焼き',
  },
  {
    id: '3',
    title: 'たこ焼き',
  },
];

@Resolver()
export class RecipesResolver {
  @Query(returns => [Recipe])
  async recipes(): Promise<Recipe[]> {
    return RECIPE_TABLE;
  }
}
