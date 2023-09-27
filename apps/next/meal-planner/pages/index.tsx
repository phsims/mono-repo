import { Favourites } from 'meal-planner/components/Favourites';
import { TopRecipes } from 'meal-planner/components/TopRecipes';

import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Meal Plnner app</title>
      </Head>
      <main>
        <h1>Meal Plnner app</h1>
        <div className="bg-indigo-500 p-2 font-mono">
          <TopRecipes />
          <Favourites />
        </div>
      </main>
    </>
  );
}
