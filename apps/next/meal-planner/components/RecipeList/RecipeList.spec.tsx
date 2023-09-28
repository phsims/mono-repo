import { render } from '@testing-library/react';

import RecipeList from './RecipeList';

describe('RecipeList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RecipeList />);
    expect(baseElement).toBeTruthy();
  });
});
