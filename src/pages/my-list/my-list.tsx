import { useEffect, useMemo } from 'react';
import { Footer } from '../../components/footer/footer.tsx';
import { WrapHeader as Header, HeaderType } from '../../components/header';
import { WrapCatalogFilms as CatalogFilms } from '../../components/catalog/catalog-films.index.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  errorFavoriteFilmsSelector,
  favoriteFilmsSelector,
  loadingStatusFavoriteFilmsSelector,
} from '../../store/favorite-films-process/selectors.ts';
import { ErrorBlock } from '../../components/error/error-block.tsx';
import { LoadingBlock } from '../../components/loading-screen/loading-block.tsx';
import { clear } from '../../store/favorite-films-process/favorite-films-process.ts';

export function MyList(): JSX.Element {
  const dispatch = useAppDispatch();
  const filmsFavorite = useAppSelector(favoriteFilmsSelector);
  const lengthFilmFavorite = useMemo(
    () => filmsFavorite.length,
    [filmsFavorite],
  );
  const filmsFavoriteLoadingStatus = useAppSelector(
    loadingStatusFavoriteFilmsSelector,
  );
  const errorFavoriteFilms = useAppSelector(errorFavoriteFilmsSelector);

  useEffect(
    () => () => {
      dispatch(clear());
    },
    [dispatch],
  );

  return (
    <div className="user-page">
      <Header headerType={HeaderType.MyList}>
        <h1 className="page-title user-page__title">
          My list{' '}
          <span className="user-page__film-count">{lengthFilmFavorite}</span>
        </h1>
      </Header>
      {filmsFavoriteLoadingStatus && <LoadingBlock />}
      {errorFavoriteFilms && <ErrorBlock message={errorFavoriteFilms} />}
      {!filmsFavoriteLoadingStatus && !errorFavoriteFilms && (
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <CatalogFilms films={filmsFavorite} />
        </section>
      )}
      <Footer />
    </div>
  );
}
