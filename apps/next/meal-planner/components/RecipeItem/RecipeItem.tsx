import { Recipe } from 'meal-planner/api/schemas';
import StarRating from 'meal-planner/components/StarRating/StarRating';

export function RecipeItem({ name, description, rating }: Recipe) {
  return (
    <>
      <p className="text-lg text-black-600 capitalize">{name}</p>
      <p className="grow ">
        {description.length > 70
          ? `${description.substring(0, 70)}...`
          : description}
      </p>
      <div>
        <StarRating initialRating={rating} maxRating={5} />
      </div>
    </>
  );
}

export default RecipeItem;
