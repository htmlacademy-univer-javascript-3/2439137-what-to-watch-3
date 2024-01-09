import { useEffect, useMemo, useState } from 'react';
import { WrapCatalogFilms as CatalogFilms } from './catalog-films.index.tsx';
import { useAppSelector } from '../../hooks';
import { ShowMore } from '../show-more/show-more.tsx';
import { WrapGenres as Genres } from '../genres';
import { DEFAULT_GENRE, getInitialStateLengthFilms } from './utils.ts';
import {
  errorFilmsSelector,
  filmsSelector,
  genreSelector,
  loadingStatusFilmsSelector,
} from '../../store/films-process/selectors.ts';
import { LoadingBlock } from '../loading-screen/loading-block.tsx';
import { ErrorBlock } from '../error/error-block.tsx';

export const Catalog = () => {
  const films = useAppSelector(filmsSelector);
  const filmsLoadingStatus = useAppSelector(loadingStatusFilmsSelector);
  const filmsError = useAppSelector(errorFilmsSelector);
  const currentGenre = useAppSelector(genreSelector);
  const filmsGenre =
    currentGenre === DEFAULT_GENRE
      ? films
      : films.filter(({ genre }) => genre === currentGenre);
  const [lengthFilmsGenre, setLengthFilmsGenre] = useState<number>(
    getInitialStateLengthFilms(filmsGenre),
  );
  useEffect(
    () => setLengthFilmsGenre(getInitialStateLengthFilms(filmsGenre)),
    [filmsGenre, currentGenre],
  );
  const catalogFilms = useMemo(
    () => filmsGenre.slice(0, lengthFilmsGenre),
    [filmsGenre, lengthFilmsGenre],
  );
  if (filmsError) {
    return <ErrorBlock message={filmsError} />;
  }

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      {filmsLoadingStatus ? (
        <LoadingBlock />
      ) : (
        <>
          <Genres films={films} />

          <CatalogFilms films={catalogFilms} />

          <ShowMore
            filmsGenre={filmsGenre}
            lengthFilmsGenre={lengthFilmsGenre}
            setLengthFilmsGenre={setLengthFilmsGenre}
          />
        </>
      )}
    </section>
  );
};
