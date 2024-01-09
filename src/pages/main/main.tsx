import { Footer } from '../../components/footer/footer.tsx';
import { PromoFilmCard } from '../../components/film-card/promo-film-card.tsx';
import { WrapCatalog as Catalog } from '../../components/catalog';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { DEFAULT_GENRE } from '../../components/catalog/utils.ts';
import { setGenre } from '../../store/films-process/films-process.ts';
import {
  errorPromoFilmSelector,
  loadingStatusPromoFilmSelector,
  promoFilmSelector,
} from '../../store/promo-film-process/selectors.ts';
import { LoadingScreen } from '../../components/loading-screen/loading-screen.tsx';
import { fetchPromoFilmAction } from '../../store/api-actions.ts';
import {
  errorFilmsSelector,
  loadingStatusFilmsSelector,
} from '../../store/films-process/selectors.ts';
import { Error } from '../../components/error/error.tsx';

export function Main(): JSX.Element {
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
