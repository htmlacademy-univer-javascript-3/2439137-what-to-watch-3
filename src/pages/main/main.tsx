import Footer from '../../components/footer/footer.tsx';
import PromoFilmCard from '../../components/filmCard/promoFilmCard.tsx';
import Catalog from '../../components/catalog/catalog.tsx';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { DEFAULT_GENRE } from '../../components/catalog/utils.ts';
import { setGenre } from '../../store/filmsProcess/filmsProcess.ts';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setGenre(DEFAULT_GENRE));
  }, [dispatch]);
  return (
    <>
      <PromoFilmCard />

      <div className="page-content">
        <Catalog />
        <Footer />
      </div>
    </>
  );
}

export default Main;
