import { Recipe } from 'meal-planner/api/schemas';

export function RecipeItem(recipe: Recipe) {
  return <li>{JSON.stringify(recipe)}</li>;
}
