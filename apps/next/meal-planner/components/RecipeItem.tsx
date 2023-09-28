import { Recipe } from 'meal-planner/api/schemas';

export default function RecipeItem({ name, description, rating }: Recipe) {
  return (
    <>
      <p className="text-lg text-black-600 capitalize">{name}</p>
      <p>
        {description.length > 70
          ? `${description.substring(0, 70)}...`
          : description}
      </p>
      <p>reating: {rating} out of 5</p>
    </>
  );
}
