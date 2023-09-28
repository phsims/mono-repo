import { Recipe } from 'meal-planner/api/schemas';

export default function RecipeItem({ name, ingredients, method }: Recipe) {
  return (
    <>
      <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
        {name}
      </h1>
      <p className="text-lg text-black-600 capitalize mb-2 mt-4">Ingredients</p>
      <ul className="text-black-500 self-start list-inside ml-8">
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <p>{ingredient}</p>
          </li>
        ))}
      </ul>
      <p className="text-lg text-black-600 capitalize mb-2 mt-4">Method</p>
      <ul className=" list-inside ml-8">
        {method.map((action, index) => (
          <li key={index}>
            <p className="text-black-500 self-start mb-2">{action}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
