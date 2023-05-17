import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import { Recipe } from '../../components/recipe';
import { RecipeData, IParams } from '../../types';
import { getAllRecipeIds, getRecipeData } from '../../data/recipies';

import { GetStaticPaths, GetStaticProps } from 'next';
type PageProps = {
  data?: RecipeData;
  hasError?: boolean;
};

export const RecipesPage: FunctionComponent<PageProps> = ({
  data,
  hasError,
}) => {
  if (!data || hasError) return <p>something went wrong</p>;

  const { name, ingredients } = data;

  return (
    <Layout>
      <Head>
        <title>{name}</title>
      </Head>
      <head>
        <h2>{name}</h2>
      </head>
      <h3>Ingredients</h3>
      {ingredients.map((item) => (
        <Recipe children={item} />
      ))}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllRecipeIds();

  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as IParams;
  const data = await getRecipeData(id);

  if (!data || !params) {
    return {
      props: { hasError: true },
    };
  }
  return {
    props: {
      data,
    },
  };
};
export default RecipesPage;
