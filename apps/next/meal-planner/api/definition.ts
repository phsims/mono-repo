import { makeEndpoint, makeApi } from '@zodios/core';
import { RecipeSchema } from './schemas';
import { z } from 'zod';

const getRecipes = makeEndpoint({
  method: 'get',
  path: '/v1/recipes',
  response: z.array(RecipeSchema),
  alias: 'getRecipes',
  description: 'Get first page of recipes',
});

const getFavourites = makeEndpoint({
  method: 'get',
  path: '/v1/favourites',
  response: z.array(RecipeSchema),
  alias: 'getFavourites',
  description: 'Get list of favourite recipes',
});

const createFavourite = makeEndpoint({
  method: 'post',
  path: '/v1/favourites',
  response: z.array(RecipeSchema),
  alias: 'createFavourite',
  description: 'Create a new favourite',
});

export const definition = makeApi([getRecipes, getFavourites, createFavourite]);
