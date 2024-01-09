import Footer from '../../components/footer/footer.tsx';
import Header, { HeaderType } from '../../components/header/header.tsx';
import CatalogFilms from '../../components/catalog/catalogFilms.tsx';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../components/loadingScreen/loadingScreen.tsx';
import {
  favoriteFilmsSelector,
  loadingStatusFavoriteFilmsSelector,
} from '../../store/favoriteFilmsProcess/selectors.ts';

function MyList(): JSX.Element {
  const filmFavorite = useAppSelector(favoriteFilmsSelector);
  const filmsFavoriteLoadingStatus = useAppSelector(
    loadingStatusFavoriteFilmsSelector,
  );

  return (
    <div className="user-page">
      <Header headerType={HeaderType.MyList}>
        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">9</span>
        </h1>
      </Header>
      {filmsFavoriteLoadingStatus ? (
        <LoadingScreen />
      ) : (
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <CatalogFilms
            films={filmFavorite}
          />
        </section>
      )}
      <Footer />
    </div>
  );
}

export default MyList;
