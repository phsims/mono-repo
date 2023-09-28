import { Favourites } from 'meal-planner/components/Favourites';
import { TopRecipes } from 'meal-planner/components/TopRecipes';

import Head from 'next/head';
import Layout from 'meal-planner/components/Layout/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Meal Plnner app</title>
      </Head>
      <Layout>
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
          Meal Plnner app
        </h1>
        <div className=" w-full py-14" id="top-recipes">
          <TopRecipes />
        </div>
      </Layout>
    </>
  );
}
