import { genres } from '../catalog/utils.ts';
import GenresItem from './genre.tsx';
import { FilmType } from '../../types/film.ts';
import { memo } from 'react';

interface GenresProps {
  films: FilmType[];
}

const Genres = ({ films }: GenresProps) => (
  <ul className="catalog__genres-list">
    {genres(films).map((genre) => (
      <GenresItem key={`key_${genre}`} title={genre} />
    ))}
  </ul>
);

export default memo(
  Genres,
  (prevProps, nextProps) =>
    genres(prevProps.films).length === genres(nextProps.films).length,
);
