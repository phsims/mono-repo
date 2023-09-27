import { useEffect, useState } from 'react';
import { RecipeItem } from 'meal-planner/components/RecipeItem';
import { RecipeList } from 'meal-planner/components/RecipeList';
import { client } from 'meal-planner/api/client';
import type { Recipe } from 'meal-planner/api/schemas';

export function TopRecipes() {
  const [topRecipes, setTopRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    client.getRecipes().then((recipes) => {
      setTopRecipes(recipes);
    });
  }, []);

  return (
    <RecipeList title="Top Recipes">
      {topRecipes.map((recipe) => (
        <RecipeItem key={recipe.id} {...recipe} />
      ))}
    </RecipeList>
  );
}
