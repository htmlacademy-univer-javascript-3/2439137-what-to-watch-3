import { FilmType } from '../../types/film.ts';
import FilmCardSmall from '../filmCard/filmCardSmall.tsx';

interface CatalogFilmsProps {
  films: FilmType[];
}

const CatalogFilms = ({ films }: CatalogFilmsProps) => (
  <div className="catalog__films-list">
    {films.map(({ id }) => (
      <FilmCardSmall key={`key_${id}`} filmId={id} />
    ))}
  </div>
);
export default CatalogFilms;
