import { useEffect, useState } from 'react';
import { RecipeItem } from 'meal-planner/components/RecipeItem';
import { RecipeList } from 'meal-planner/components/RecipeList';
import { client } from 'meal-planner/api/client';
import type { Recipe } from 'meal-planner/api/schemas';

export function Favourites() {
  const [favourites, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    client.getFavourites().then((recipes) => {
      setRecipes(recipes);
    });
  }, []);

  return (
    <RecipeList title="Favourites">
      {favourites.map((favourite) => (
        <RecipeItem key={favourite.id} {...favourite} />
      ))}
    </RecipeList>
  );
}
