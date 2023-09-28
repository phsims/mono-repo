import { render } from '@testing-library/react';

import TopRecipes from './TopRecipes';

describe('TopRecipes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TopRecipes />);
    expect(baseElement).toBeTruthy();
  });
});
