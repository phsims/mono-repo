import React from 'react';
import axios from 'axios';
import { render, fireEvent, act } from '@testing-library/react';

import { mockContacts } from './mock-data';
import App from './app';

describe('App', () => {
  const axiosMock = jest.spyOn(axios, 'get');

  beforeEach(() =>
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockContacts })
  );
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Equals tech test/gi)).toBeTruthy();
  });

  it('should display cards', async () => {
    const { findAllByRole } = render(<App />);
    act(async () => {
      expect(await findAllByRole('listitem')).toHaveLength(3);
      expect(axiosMock).toHaveBeenCalledTimes(1);
    });
  });

  it('should display  modal', async () => {
    const { findByTestId } = render(<App />);
    act(async () => {
      fireEvent.click(await findByTestId('456'));
      expect(await findByTestId('contact-modal-456')).toBeTruthy();
    });
  });
});
