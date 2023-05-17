import { RecipeData } from '../types';

export const recipes: RecipeData[] = [
  {
    id: '1',
    name: 'Yorkshire puddings',
    ingredients: [
      { ingredient: 'plain flour', unit: '140', measurement: 'g' },
      { ingredient: 'eggs', unit: '4' },
      { ingredient: 'milk', unit: '200', measurement: 'ml' },
    ],
  },
  {
    id: '2',
    name: 'pancakes',
    ingredients: [
      { ingredient: 'plain flour', unit: '100', measurement: 'g' },
      { ingredient: 'eggs', unit: '2', measurement: 'large' },
      { ingredient: 'milk', unit: '300', measurement: 'ml' },
    ],
  },
  {
    id: '3',
    name: 'Cauliflower cheese',
    ingredients: [
      { ingredient: 'plain flour', unit: '4', measurement: 'tbs' },
      { ingredient: 'cauliflower', unit: '1', measurement: 'large' },
      { ingredient: 'milk', unit: '500', measurement: 'ml' },
      { ingredient: 'butter', unit: '550', measurement: 'g' },
      { ingredient: 'strong cheddar', unit: '100', measurement: 'g' },
    ],
  },
];

export function getAllRecipeIds() {
  return recipes.map((recipe) => {
    return {
      params: {
        id: recipe.id,
      },
    };
  });
}

export function getRecipeData(id: string): RecipeData | null {
  const recipe = recipes?.find((recipe) => recipe.id === id) || null;

  return recipe;
}
