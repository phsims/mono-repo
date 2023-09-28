import { PropsWithChildren } from 'react';

interface Props {
  title: string;
  discription?: string;
}

export function RecipeList({
  title,
  discription,
  children,
}: PropsWithChildren<Props>) {
  return (
    <>
      <h2 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
        {title}
      </h2>
      {discription && (
        <p className="leading-normal w-10/12  my-2 ">{discription}</p>
      )}
      <div className=" w-full py-14">
        <ul className="grid grid-cols-4 grid-rows-1 gap-4">{children}</ul>
      </div>
    </>
  );
}
