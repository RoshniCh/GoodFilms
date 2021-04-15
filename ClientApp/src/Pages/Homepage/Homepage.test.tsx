import React from 'react';
import { Homepage } from './Homepage';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

it('renders home page without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Homepage />
    </MemoryRouter>, div);
  await new Promise(resolve => setTimeout(resolve, 1000));
});