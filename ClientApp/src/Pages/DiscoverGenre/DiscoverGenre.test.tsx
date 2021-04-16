import React from 'react';
import { DiscoverLanguage } from './DiscoverGenre';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

it('renders discover by language without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <DiscoverLanguage />
    </MemoryRouter>, div);
  await new Promise(resolve => setTimeout(resolve, 1000));
});