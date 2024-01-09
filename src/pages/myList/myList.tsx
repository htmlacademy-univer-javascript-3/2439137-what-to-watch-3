import Footer from '../../components/footer/footer.tsx';
import { HeaderWrap as Header, HeaderType } from '../../components/header';
import CatalogFilms from '../../components/catalog/catalogFilms.tsx';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../components/loadingScreen/loadingScreen.tsx';
import {
  favoriteFilmsSelector,
  loadingStatusFavoriteFilmsSelector,
} from '../../store/favoriteFilmsProcess/selectors.ts';
import { useMemo } from 'react';

function MyList(): JSX.Element {
  const filmsFavorite = useAppSelector(favoriteFilmsSelector);
  const lengthFilmFavorite = useMemo(
    () => filmsFavorite.length,
    [filmsFavorite],
  );
  const filmsFavoriteLoadingStatus = useAppSelector(
    loadingStatusFavoriteFilmsSelector,
  );

  return (
    <div className="user-page">
      <Header headerType={HeaderType.MyList}>
        <h1 className="page-title user-page__title">
          My list{' '}
          <span className="user-page__film-count">{lengthFilmFavorite}</span>
        </h1>
      </Header>
      {filmsFavoriteLoadingStatus ? (
        <LoadingScreen />
      ) : (
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <CatalogFilms films={filmsFavorite} />
        </section>
      )}
      <Footer />
    </div>
  );
}

export default MyList;
