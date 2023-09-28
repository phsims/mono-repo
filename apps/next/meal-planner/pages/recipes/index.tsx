import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RecipeList } from 'meal-planner/components/RecipeList';
import { client } from 'meal-planner/api/client';
import type { Recipe } from 'meal-planner/api/schemas';
import Layout from 'meal-planner/components/Layout/Layout';
import RecipeItem from 'meal-planner/components/RecipeItem';
export default function AllRecipes() {
  const [topRecipes, setTopRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    client.getRecipes().then((recipes) => {
      setTopRecipes(recipes);
    });
  }, []);

  return (
    <>
      <Layout>
        <RecipeList
          title="All Recipes"
          discription="Explore our recipes from around the world on our website."
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
      </Layout>
    </>
  );
}
