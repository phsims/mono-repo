import { zodiosRouter } from '@zodios/express';
import { definition } from './definition';

export const router = zodiosRouter(definition);
const fakeRecipes = [
  {
    id: 1,
    title: 'Test Recipe',
    url: 'https://google.com',
    score: 100,
    time: 1234567890,
    descendants: 100,
    by: 'test',
    kids: [1, 2, 3],
  },
  {
    id: 2,
    title: 'Test Recipe 2',
    url: 'https://google.com',
    score: 100,
    time: 1234567890,
    descendants: 100,
    by: 'test',
    kids: [1, 2, 3],
  },
];

router.get('/v1/recipes', async (req, res) => {
  res.status(200).json(fakeRecipes);
});

router.get('/v1/favourites', async (req, res) => {
  res.status(200).json(fakeRecipes);
});

router.post('/v1/favourites', async (req, res) => {
  res.status(501);
});
