import type { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { client } from 'meal-planner/api/client';
import Layout from 'meal-planner/components/Layout/Layout';

import { Recipe } from 'meal-planner/api/schemas';

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface Props {
  recipe: Recipe;
}

export function RecipePage({ recipe }: Props) {
  const { name, ingredients, method } = recipe;

  return (
    <Layout>
      {!recipe ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
            {name}
          </h1>
          <p className="text-lg text-black-600 capitalize mb-2 mt-4">
            Ingredients
          </p>
          <ul className="text-black-500 self-start list-inside ml-8">
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                <p>{ingredient}</p>
              </li>
            ))}
          </ul>
          <p className="text-lg text-black-600 capitalize mb-2 mt-4">Method</p>
          <ul className=" list-inside ml-8">
            {method.map((action, index) => (
              <li key={index}>
                <p className="text-black-500 self-start mb-2">{action}</p>
              </li>
            ))}
          </ul>
        </>
      )}
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

export default RecipePage;
