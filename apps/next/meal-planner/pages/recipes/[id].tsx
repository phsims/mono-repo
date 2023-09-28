import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { client } from 'meal-planner/api/client';
import Layout from 'meal-planner/components/Layout/Layout';
import RecipeItem from 'meal-planner/components/RecipeItem';

import { Recipe } from 'meal-planner/api/schemas';

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface Props {
  recipe: Recipe;
}

export default function RecipePage({ recipe }: Props) {
  return (
    <Layout>
      {!recipe ? <h1>Loading...</h1> : <RecipeItem {...recipe} />}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as IParams;
  const data = await client.getRecipebyId({
    params: { id: id },
  });
  return {
    props: {
      recipe: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allRecipes = await client.getRecipes();

  return {
    paths: allRecipes.map((data) => ({
      params: { id: data.id },
    })),
    fallback: true,
  };
};
