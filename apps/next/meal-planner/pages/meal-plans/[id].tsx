import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React, { FunctionComponent } from 'react';
import Layout from '../../components/layout';
import { DayPlan } from '../../components/day-plan';
import { IParams, MealPlan } from '../../types';

import { getAllMealPlanData, getAllMealPlanIds } from '../../data/meal-plans';

type PageProps = {
  data?: MealPlan;
  hasError: boolean;
};

export const MealPlansPage: FunctionComponent<PageProps> = ({
  data,
  hasError,
}) => {
  if (!data || hasError) return <p>something went wrong</p>;

  const { id } = data;
  return (
    <Layout>
      <Head>
        <title>Meal plan for {id}</title>
      </Head>
      <header>
        <h2>Meal plan for {id}</h2>
      </header>
      <DayPlan children={data} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllMealPlanIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as IParams;
  const data = await getAllMealPlanData(id);

  if (!data || !params) {
    return {
      props: {
        hasError: true,
      },
    };
  }
  return {
    props: {
      data,
    },
  };
};

export default MealPlansPage;
