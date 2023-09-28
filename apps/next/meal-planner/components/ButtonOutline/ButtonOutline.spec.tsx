import { render } from '@testing-library/react';

import ButtonOutline from './ButtonOutline';

describe('ButtonOutline', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ButtonOutline />);
    expect(baseElement).toBeTruthy();
  });
});
