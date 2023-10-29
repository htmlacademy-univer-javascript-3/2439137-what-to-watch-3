import { films } from '../../mocks/films.ts';
import { FilmType } from '../../types/film.ts';
import { Genre } from '../../types/genre.ts';
import CatalogFilms from './catalogFilms.tsx';
import { useState } from 'react';

const DEFAULT_GENRE = 'All genres';
const DEFAULT_FILM_AMOUNT = 8;
const genres = [DEFAULT_GENRE, ...new Set(films.map(({ genre }) => genre))];

interface CatalogProps {
  film: FilmType;
}

const CatalogItem = ({ title, href, isActive }: Genre) => (
  <li
    key={`key_${title}`}
    className={`catalog__genres-item ${
      isActive ? 'catalog__genres-item--active' : ''
    }`}
  >
    <a href={href} className="catalog__genres-link">
      {title}
    </a>
  </li>
);

const Catalog = ({ film }: CatalogProps) => {
  const [countFilms, setCountFilms] = useState(
    Math.min(DEFAULT_FILM_AMOUNT, films.length),
  );
  const listCatalogFilms = films
    .filter(({ id }) => id !== film.id)
    .slice(0, countFilms);
  const handleShowMore = () => {
    setCountFilms((count) => Math.min(count + 8, films.length));
  };
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <ul className="catalog__genres-list">
        {genres.map(
          (genre) =>
            genre && (
              <CatalogItem
                key={`key_${genre}`}
                title={genre}
                href={`#${genre.toLowerCase().replace(' ', '_')}`}
                isActive={false}
              />
            ),
        )}
      </ul>

      <CatalogFilms films={listCatalogFilms} />

      {countFilms < films.length && (
        <div className="catalog__more">
          <button
            className="catalog__button"
            type="button"
            onClick={handleShowMore}
          >
            Show more
          </button>
        </div>
      )}
    </section>
  );
};
export default Catalog;
