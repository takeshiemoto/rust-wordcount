import React from 'react';
import { useQuery } from 'urql';

const RecipeQuery  = `
  query {
    recipes {
      id
      title
    }
  }
`

type Recipe = {
  id: string;
  title: string;
}

type RecipeData = {
  recipes: Recipe[]
}

export function Index() {
  const [result, executeQuery] = useQuery<RecipeData>({
    query: RecipeQuery
  })

  const { data, fetching, error } = result;

  if (fetching) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Oh no ... {error.message}</div>
  }

  return (
    <div>
      <h2>Index page</h2>
      <ul>
        {data.recipes.map(recipe => <li key={recipe.id}>{recipe.title}</li>)}
      </ul>
      <button onClick={() => executeQuery()}>Re Execute</button>
    </div>
  );
}

export default Index;
