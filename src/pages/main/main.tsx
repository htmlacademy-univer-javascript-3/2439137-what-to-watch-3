import Footer from '../../components/footer/footer.tsx';
import PromoFilmCard from '../../components/filmCard/promoFilmCard.tsx';
import { CatalogWrap as Catalog } from '../../components/catalog';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { DEFAULT_GENRE } from '../../components/catalog/utils.ts';
import { setGenre } from '../../store/filmsProcess/filmsProcess.ts';
import {
  errorPromoFilmSelector,
  loadingStatusPromoFilmSelector,
  promoFilmSelector,
} from '../../store/promoFilmProcess/selectors.ts';
import LoadingScreen from '../../components/loadingScreen/loadingScreen.tsx';
import { fetchPromoFilmAction } from '../../store/api-actions.ts';
import {
  errorFilmsSelector,
  loadingStatusFilmsSelector,
} from '../../store/filmsProcess/selectors.ts';
import Error from '../../components/error/error.tsx';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  const filmPromo = useAppSelector(promoFilmSelector);
  const filmPromoLoadingStatus = useAppSelector(loadingStatusPromoFilmSelector);
  const filmPromoError = useAppSelector(errorPromoFilmSelector);
  const filmsLoadingStatus = useAppSelector(loadingStatusFilmsSelector);
  const filmsError = useAppSelector(errorFilmsSelector);
  useEffect(() => {
    dispatch(fetchPromoFilmAction());
  }, [dispatch]);
  useEffect(() => {
    dispatch(setGenre(DEFAULT_GENRE));
  }, [dispatch]);

  if (filmPromoError && filmsError) {
    return <Error message={filmPromoError} />;
  }

  if (filmPromoLoadingStatus && filmsLoadingStatus) {
    return <LoadingScreen />;
  }

  return (
    <>
      {filmPromo && <PromoFilmCard film={filmPromo} />}

      <div className="page-content">
        <Catalog />
        <Footer />
      </div>
    </>
  );
}

export default Main;
