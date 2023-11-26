import Footer from '../../components/footer/footer.tsx';
import Header, { HeaderType } from '../../components/header/header.tsx';
import CatalogFilms from '../../components/catalog/catalogFilms.tsx';
import { useAppSelector } from '../../components/hooks';
import {
  authorizationStatusSelector,
  filmsFavoriteLoadingStatusSelector,
  filmsFavoriteSelector,
} from '../../store/selectors.ts';
import { AuthorizationStatus } from '../../const.ts';
import Empty from '../empty/empty.tsx';
import Error404 from '../../components/error/error404.tsx';
import LoadingScreen from '../../components/loadingScreen/loadingScreen.tsx';

function MyList(): JSX.Element {
  const authorizationStatus = useAppSelector(authorizationStatusSelector).data;
  const filmFavorite = useAppSelector(filmsFavoriteSelector);
  const filmsFavoriteLoadingStatus = useAppSelector(
    filmsFavoriteLoadingStatusSelector,
  );

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return (
      <Empty>
        <Error404 />
      </Empty>
    );
  }
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

          <CatalogFilms films={filmFavorite} />
        </section>
      )}
      <Footer />
    </div>
  );
}

export default MyList;
