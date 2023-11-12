import { FilmType } from '../../types/film.ts';
import Footer from '../../components/footer/footer.tsx';
import FilmCard from '../../components/filmCard/filmCard.tsx';
import Catalog from '../../components/catalog/catalog.tsx';

export interface MainPros {
  film: FilmType;
}

function Main({ film }: MainPros): JSX.Element {
  return (
    <>
      <FilmCard film={film} />

      <div className="page-content">
        <Catalog />
        <Footer />
      </div>
    </>
  );
}

export default Main;
