import { render } from '@testing-library/react';
import { mockContacts } from '../mock-data';
import ContactCard from './contact-card';

describe('ContactCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContactCard {...mockContacts[0]} />);
    expect(baseElement).toBeTruthy();
  });
});
