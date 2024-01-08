import Footer from '../../components/footer/footer.tsx';
import Header, { HeaderType } from '../../components/header/header.tsx';
import CatalogFilms from '../../components/catalog/catalogFilms.tsx';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const.ts';
import LoadingScreen from '../../components/loadingScreen/loadingScreen.tsx';
import { authorizationStatusSelector } from '../../store/userProcess/selectors.ts';
import {
  favoriteFilmsSelector,
  loadingStatusFavoriteFilmsSelector,
} from '../../store/favoriteFilmsProcess/selectors.ts';
import SignIn from '../signIn/signIn.tsx';

function MyList(): JSX.Element {
  const authorizationStatus = useAppSelector(authorizationStatusSelector);
  const filmFavorite = useAppSelector(favoriteFilmsSelector);
  const filmsFavoriteLoadingStatus = useAppSelector(
    loadingStatusFavoriteFilmsSelector,
  );

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return <SignIn />;
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
