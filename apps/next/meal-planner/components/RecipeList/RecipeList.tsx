import Link from 'next/link';
import type { Recipe } from 'meal-planner/api/schemas';
import RecipeItem from 'meal-planner/components/RecipeItem/RecipeItem';

interface Props {
  title: string;
  discription?: string;
  recipes: Array<Recipe>;
}

export function RecipeList({ title, discription, recipes }: Props) {
  return (
    <>
      <h2 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
        {title}
      </h2>
      {discription && (
        <p className="leading-normal w-10/12  my-2 ">{discription}</p>
      )}
      <div className=" w-full py-14">
        <ul className="grid grid-cols-4  gap-4">
          {recipes.map((recipe, index) => (
            <li className="h-full flex flex-col">
              <Link
                key={index}
                href={`/recipes/${recipe.id}`}
                className="flex flex-col px-3  border-2 border-gray-500 hover:border-orange-500 transition-all rounded-lg p-8 h-full "
              >
                <RecipeItem {...recipe} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default RecipeList;
