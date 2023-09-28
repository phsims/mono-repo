import { TopRecipes } from 'meal-planner/components/TopRecipes/TopRecipes';

import Head from 'next/head';
import Layout from 'meal-planner/components/Layout/Layout';

export function Home() {
  return (
    <>
      <Head>
        <title>Meal Planner app</title>
      </Head>
      <Layout>
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
          Meal Planner app
        </h1>
        <div className=" w-full py-14" id="top-recipes">
          <TopRecipes />
        </div>
      </Layout>
    </>
  );
}
export default Home;
