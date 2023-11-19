import CatalogFilms from './catalogFilms.tsx';
import { useAppSelector } from '../hooks';
import ShowMore from '../showMore/showMore.tsx';
import { filmsSelector, genreSelector } from '../../store/selectors';
import Genres from '../genres/genres.tsx';
import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_GENRE, initialStateLengthFilms } from './utils.ts';

const Catalog = () => {
  const films = useAppSelector(filmsSelector);
  const currentGenre = useAppSelector(genreSelector);
  const filmsGenre =
    currentGenre === DEFAULT_GENRE
      ? films
      : films.filter(({ genre }) => genre === currentGenre);
  const [lengthFilmsGenre, setLengthFilmsGenre] = useState<number>(
    initialStateLengthFilms(filmsGenre),
  );
  useEffect(
    () => setLengthFilmsGenre(initialStateLengthFilms(filmsGenre)),
    [filmsGenre, currentGenre],
  );
  const catalogFilms = useMemo(
    () => filmsGenre.slice(0, lengthFilmsGenre),
    [filmsGenre, lengthFilmsGenre],
  );
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <Genres />

      <CatalogFilms films={catalogFilms} />

      <ShowMore
        filmsGenre={filmsGenre}
        lengthFilmsGenre={lengthFilmsGenre}
        setLengthFilmsGenre={setLengthFilmsGenre}
      />
    </section>
  );
};
export default Catalog;
