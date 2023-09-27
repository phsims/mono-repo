import { PropsWithChildren } from 'react';

export function RecipeList({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </div>
  );
}
