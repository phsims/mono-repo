import { render } from '@testing-library/react';

import Id from './[id]';

describe('Id', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Id />);
    expect(baseElement).toBeTruthy();
  });
});
