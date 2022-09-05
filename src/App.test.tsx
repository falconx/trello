import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders page header', async () => {
    render(<App />);

    const heading = await screen.findByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('renders default column headers', async () => {
    render(<App />);

    let column;

    column = await screen.findByText('To Do');
    expect(column).toBeInTheDocument();

    column = await screen.findByText('In Progress');
    expect(column).toBeInTheDocument();

    column = await screen.findByText('Done');
    expect(column).toBeInTheDocument();
  });
});
