import { FilmType } from '../../types/film.ts';
import FilmCardSmall from '../filmCard/filmCardSmall.tsx';

interface CatalogFilmsProps {
  films: FilmType[];
}

const CatalogFilms = ({ films }: CatalogFilmsProps) => (
  <div className="catalog__films-list">
    {films.map((film) => (
      <FilmCardSmall key={`key_${film.id}`} film={film} />
    ))}
  </div>
);
export default CatalogFilms;
