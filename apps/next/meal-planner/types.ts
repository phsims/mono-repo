import { ParsedUrlQuery } from 'querystring';

export interface IngredientData {
  ingredient: string;
  unit: string;
  measurement?: string;
}

export interface RecipeData {
  id: string;
  name: string;
  ingredients: IngredientData[];
}

export interface RecipieParams {
  params: {
    id: string;
  };
}

export interface IParams extends ParsedUrlQuery {
  id: string;
}

export interface Meal {
  name: string;
  items: string[];
}

export interface MealPlan {
  id: string;
  meals: Meal[];
}
export interface MealPlans {
  id: string;
  MealPlan: Meal[];
}
