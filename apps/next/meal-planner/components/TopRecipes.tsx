import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RecipeList } from 'meal-planner/components/RecipeList';
import { client } from 'meal-planner/api/client';
import type { Recipe } from 'meal-planner/api/schemas';
import RecipeItem from './RecipeItem';
import ButtonOutline from 'meal-planner/components/ButtonOutline';

export function TopRecipes() {
  const [topRecipes, setTopRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    client
      .getRecipes({ queries: { limit: 4, rating: true } })
      .then((recipes) => {
        setTopRecipes(recipes);
      });
  }, []);

  return (
    <>
      <RecipeList
        title="Top Recipes"
        discription="Explore a curated collection of top-rated recipes from around the world on our website. Discover mouthwatering dishes, expertly crafted and reviewed by culinary enthusiasts. Elevate your cooking game with our handpicked selection of the most delicious recipes for every palate"
      >
        {topRecipes.map((recipe, index) => (
          <Link
            href={`/recipes/${recipe.id}`}
            className="px-3 flex flex-col border-2 border-gray-500 hover:border-orange-500 transition-all rounded-lg p-8 "
          >
            <li key={index}>
              <RecipeItem {...recipe} />
            </li>
          </Link>
        ))}
      </RecipeList>
      <div className=" font-medium ">
        <Link href="/recipes">
          <ButtonOutline>View All Recipes</ButtonOutline>
        </Link>
      </div>
    </>
  );
}
