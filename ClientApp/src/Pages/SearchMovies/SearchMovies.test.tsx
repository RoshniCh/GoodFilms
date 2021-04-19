import React from 'react';
import { SearchMovies } from './SearchMovies';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

it('renders home page without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <SearchMovies />
    </MemoryRouter>, div);
  await new Promise(resolve => setTimeout(resolve, 1000));
});