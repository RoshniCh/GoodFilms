import React from 'react';
import { Social } from './Social';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

it('renders social page without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Social />
    </MemoryRouter>, div);
  await new Promise(resolve => setTimeout(resolve, 1000));
});