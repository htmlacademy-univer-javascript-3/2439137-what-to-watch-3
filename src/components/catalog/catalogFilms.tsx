import { FilmType } from '../../types/film.ts';
import FilmCardSmall from '../filmCard/filmCardSmall.tsx';
import { useState } from 'react';

interface CatalogFilmsProps {
  films: FilmType[];
  countFilmsInfo?: number;
}

const CatalogFilms = ({ films, countFilmsInfo = films.length }: CatalogFilmsProps) => {
  const [countFilms, setCountFilms] = useState(Math.min(countFilmsInfo, films.length));
  const idHoveredFilmState = useState<string | null>(null);
  return (
    <>
      <div className="catalog__films-list">
        {films.slice(0, countFilms).map(({ id, title, imgPath }) => (
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
      {countFilms < films.length && (
        <div className="catalog__more">
          <button
            className="catalog__button"
            type="button"
            onClick={() =>
              setCountFilms((count) => Math.min(count + 8, films.length))}
          >
            Show more
          </button>
        </div>
      )}
    </>
  );
};
export default CatalogFilms;
