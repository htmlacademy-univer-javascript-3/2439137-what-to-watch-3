import Footer from '../../components/footer/footer.tsx';
import FilmCard from '../../components/filmCard/filmCard.tsx';
import Catalog from '../../components/catalog/catalog.tsx';
import { useAppDispatch } from '../../components/hooks';
import { useEffect } from 'react';
import { setGenre } from '../../store/action.ts';
import { DEFAULT_GENRE } from '../../components/catalog/utils.ts';

function Main(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setGenre(DEFAULT_GENRE));
  }, [dispatch]);
  return (
    <>
      <FilmCard/>

      <div className="page-content">
        <Catalog />
        <Footer />
      </div>
    </>
  );
}

export default Main;
