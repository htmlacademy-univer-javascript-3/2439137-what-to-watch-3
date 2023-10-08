import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {filmData} from './pages/main/filmData.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
const film = filmData[0];

root.render(
  <React.StrictMode>
    {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
    <App genre={film.genre} releaseDate={film.releaseDate} title={film.title} imgPath={film.imgPath} backgroundImgPath={film.backgroundImgPath}/>
  </React.StrictMode>,
);
