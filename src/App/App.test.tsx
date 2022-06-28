import App from './App';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, screen } from '@testing-library/react';
import React from 'react';

afterAll(() => { jest.spyOn(React, 'useState').mockRestore(); cleanup(); })

test('renders without errors', () => {
  render(<App />);
});

test('if loading exists', async () => {
  render(<App />);
  const text = screen.getByTestId(/loadingTest/);
  expect(text).toBeInTheDocument();
  expect(text).toHaveTextContent('Loading data...');
});

test('if data exists', async () => {
  const data = { title: 'some title' }

  React.useState = jest.fn().mockReturnValue([data, {}])
  render(<App />);

  const text = screen.getByTestId(/dataTest/);
  expect(text).toBeInTheDocument();
});