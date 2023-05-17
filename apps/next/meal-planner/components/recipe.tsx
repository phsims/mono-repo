import React, { Fragment, FunctionComponent } from 'react';

import { IngredientData } from '../types';

type IngredientProps = {
  children: IngredientData;
};

export const Recipe: FunctionComponent<IngredientProps> = ({ children }) => {
  const { unit, measurement, ingredient } = children;

  return (
    <section id="ingredients">
      <span>{unit}</span>
      <span>{measurement}</span>
      <span>{ingredient}</span>
    </section>
  );
};
