import { useEffect, useState } from 'react';
import { RecipeList } from 'meal-planner/components/RecipeList/RecipeList';
import { client } from 'meal-planner/api/client';
import type { Recipe } from 'meal-planner/api/schemas';
import Layout from 'meal-planner/components/Layout/Layout';

export default function AllRecipes() {
  const [allRecipes, setallRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    client.getRecipes().then((recipes) => {
      setallRecipes(recipes);
    });
  }, []);

  return (
    <>
      <Layout>
        <RecipeList
          title="All Recipes"
          discription="Explore our recipes from around the world on our website."
          recipes={allRecipes}
        />
      </Layout>
    </>
  );
}
