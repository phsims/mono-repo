import Image from 'next/image';
import { Recipe } from 'meal-planner/api/schemas';
import StarRating from 'meal-planner/components/StarRating/StarRating';
import styles from './RecipeItem.module.scss';

export function RecipeItem({ name, description, rating, image }: Recipe) {
  return (
    <div className={styles['container']}>
      <div className="w-full h-32 relative">
        <Image src={image} alt={name} fill />
      </div>

      <div className="p-8">
        <p className="text-lg text-black-600 capitalize">{name}</p>
        <p className="grow ">
          {description.length > 70
            ? `${description.substring(0, 70)}...`
            : description}
        </p>
        <div>
          <StarRating initialRating={rating} maxRating={5} />
        </div>
      </div>
    </div>
  );
}

export default RecipeItem;
