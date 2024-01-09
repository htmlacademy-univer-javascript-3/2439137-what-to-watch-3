import { FilmType } from '../../types/film.ts';
import { FilmCardSmall } from '../film-card/film-card-small.tsx';

interface CatalogFilmsProps {
  films: FilmType[];
}

export const CatalogFilms = ({ films }: CatalogFilmsProps) => (
  <div className="catalog__films-list" data-testid={'catalog__films'}>
    {films.map((film) => (
      <FilmCardSmall key={`key_${film.id}`} film={film} />
    ))}
  </div>
);
