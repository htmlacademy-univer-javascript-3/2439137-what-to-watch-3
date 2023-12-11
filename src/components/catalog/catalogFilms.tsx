import { FilmType } from '../../types/film.ts';
import FilmCardSmall from '../filmCard/filmCardSmall.tsx';
import { memo } from 'react';

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
export default memo(
  CatalogFilms,
  (prevProps, nextProps) => prevProps.films.length === nextProps.films.length,
);
