import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import { films } from './mocks/films.ts';
import { reviews } from './mocks/reviews.ts';
import { players } from './mocks/players.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
const film = films?.[0];

root.render(
  <React.StrictMode>
    <App
      mainProps={{ film }}
      movieProps={films}
      reviewProps={reviews}
      playerProps={players}
    />
    )
  </React.StrictMode>,
);
