import CatalogFilms from './catalogFilms.tsx';
import { useAppSelector } from '../hooks';
import ListGenres from '../listGenres/listGenres.tsx';
import ShowMore from '../showMore/showMore.tsx';

const Catalog = () => {
  const listFilmsGenre = useAppSelector((state) => state.listFilms);
  const countListGenres = useAppSelector((state) => state.countListGenres);
  const listCatalogFilms = listFilmsGenre.slice(0, countListGenres);
  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <ListGenres />

      <CatalogFilms films={listCatalogFilms} />

      <ShowMore />
    </section>
  );
};
export default Catalog;
