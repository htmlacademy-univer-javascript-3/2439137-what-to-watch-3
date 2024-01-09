import { getAvailableGenres } from '../catalog/utils.ts';
import { GenresItem } from './genre.tsx';
import { FilmType } from '../../types/film.ts';

interface GenresProps {
  films: FilmType[];
}

export const Genres = ({ films }: GenresProps) => (
  <ul className="catalog__genres-list">
    {getAvailableGenres(films).map((genre) => (
      <GenresItem key={`key_${genre}`} title={genre} />
    ))}
  </ul>
);
