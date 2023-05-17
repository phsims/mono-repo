import { MealPlan } from '../types';

export const mealPlans: MealPlan[] = [
  {
    id: 'today',
    meals: [
      {
        name: 'lunch',
        items: ['1', '3'],
      },
      {
        name: 'dinner',
        items: ['3'],
      },
    ],
  },
  {
    id: 'tomorrow',
    meals: [
      {
        name: 'lunch',
        items: ['2', '1'],
      },
      {
        name: 'dinner',
        items: ['2'],
      },
    ],
  },
];

export function getAllMealPlanIds() {
  return mealPlans.map((mealPlan) => {
    return {
      params: {
        id: mealPlan.id,
      },
    };
  });
}

export function getAllMealPlanData(id: string) {
  const mealPlan = mealPlans?.find((mealPlan) => mealPlan.id === id) || null;
  return mealPlan;
}
