import { z } from 'zod';

export const RecipeSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string(),
  score: z.number(),
  time: z.number(),
  descendants: z.number(),
  by: z.string(),
  kids: z.array(z.number()),
});
export type Recipe = z.infer<typeof RecipeSchema>;
