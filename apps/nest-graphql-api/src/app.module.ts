import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { CatsModule } from './modules/cats/cats.module';
import { RecipesModule } from './modules/recipes/recipes.module';

@Module({
  imports: [CatsModule, GraphQLModule.forRoot({
    playground: true,
    autoSchemaFile: 'apps/nest-graphql-api/schema.gql'
  }), RecipesModule],
})
export class AppModule {}
