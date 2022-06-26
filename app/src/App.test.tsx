import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Routes } from 'react-router-dom';

test('renders have a main div', () => {
  render(<App />);
  const main = screen.getByRole('main');
  expect(main).toBeInTheDocument();
});
