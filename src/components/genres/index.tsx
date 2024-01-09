import { memo } from 'react';
import { Genres } from './genres.tsx';
import { getAvailableGenres } from '../catalog/utils.ts';

export const WrapGenres = memo(
  Genres,
  (prevProps, nextProps) =>
    getAvailableGenres(prevProps.films).length === getAvailableGenres(nextProps.films).length,
);
