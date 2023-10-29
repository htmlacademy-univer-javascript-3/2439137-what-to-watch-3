import { FilmType } from '../../types/film.ts';
import FilmCardSmall from '../filmCard/filmCardSmall.tsx';
import { useState } from 'react';

interface CatalogFilmsProps {
  films: FilmType[];
}

const CatalogFilms = ({ films }: CatalogFilmsProps) => {
  const idHoveredFilmState = useState<string | null>(null);
  return (
    <div className="catalog__films-list">
      {films.map(({ id, title, imgPath }) => (
        <FilmCardSmall
          key={`key_${id}`}
          film={{ id, title, imgPath }}
          onMouseOut={() => idHoveredFilmState[1](null)}
          onMouseOver={() => {
            idHoveredFilmState[1](id);
          }}
        />
      ))}
    </div>
  );
};
export default CatalogFilms;
