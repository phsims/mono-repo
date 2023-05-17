import React, { FunctionComponent } from 'react';
import { MealPlan } from '../types';

type DayPlanProps = {
  children: MealPlan;
};

export const DayPlan: FunctionComponent<DayPlanProps> = ({ children }) => {
  const { meals } = children;
  return (
    <div>
      {meals.map((meal) => {
        const { name, items } = meal;
        return (
          <div>
            <h3>{name}</h3>
            {items.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        );
      })}
    </div>
  );
};
