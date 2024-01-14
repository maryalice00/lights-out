import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Board from './Board';

test('renders a cell properly', () => {
  const { getByTestId } = render(<Board />);
  const cell = getByTestId('cell-0-0'); 
  expect(cell).toBeInTheDocument();
});

test('renders the starter Board', () => {
  const { asFragment } = render(<Board />);
  expect(asFragment()).toMatchSnapshot();
});

test('handles cell-clicking and flips cells correctly', () => {
  const { getByTestId } = render(<Board />);
  const cell = getByTestId('cell-0-0'); 
  fireEvent.click(cell);
  
});

test('checks for a win and shows a "You won!" message', () => {
  const { getByText, queryByText } = render(<Board />);
  const cell = getByText('You Won!');
  expect(cell).not.toBeInTheDocument(); 
});
