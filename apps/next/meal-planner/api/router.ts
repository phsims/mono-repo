import { zodiosRouter } from '@zodios/express';
import { definition } from './definition';
import { recipes } from 'meal-planner/mock-data/recipes';
export const router = zodiosRouter(definition);

router.get('/v1/recipes', async (req, res) => {
  const limitParam = req?.query?.limit as number;

  if (limitParam) return res.status(200).json(recipes.slice(0, limitParam));

  return res.status(200).json(recipes);
});

router.get('/v1/recipes/:id', async (req, res) => {
  const recipe = recipes.find((recipe) => recipe.id === req.params.id);

  return res.status(200).json(recipe);
});

router.get('/v1/favourites', async (req, res) => {
  return res.status(200).json(recipes);
});

router.post('/v1/favourites', async (req, res) => {
  return res.status(501);
});
