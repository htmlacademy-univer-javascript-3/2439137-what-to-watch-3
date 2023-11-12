import CatalogFilms from './catalogFilms.tsx';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks';
import {
  DEFAULT_FILM_AMOUNT,
  initialStateCountFilms,
} from './utils.ts';
import ListGenres from '../listGenres/listGenres.tsx';

const Catalog = () => {
  const listFilmsGenre = useAppSelector((state) => state.listFilms);
  const [countFilms, setCountFilms] = useState(
    initialStateCountFilms(listFilmsGenre),
  );
  useEffect(
    () => setCountFilms(initialStateCountFilms(listFilmsGenre)),
    [listFilmsGenre],
  );
  const listCatalogFilms = listFilmsGenre.slice(0, countFilms);

  const handleShowMore = () => {
    setCountFilms((count) =>
      Math.min(count + DEFAULT_FILM_AMOUNT, listFilmsGenre.length),
    );
  };
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <ListGenres />

      <CatalogFilms films={listCatalogFilms} />

      {countFilms < listFilmsGenre.length && (
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
