import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import { filmData } from './pages/main/filmData.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
const film = filmData?.[0];

root.render(
  <React.StrictMode>
    {film && <App film={{ ...film }} />}
  </React.StrictMode>,
);
