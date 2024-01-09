import { memo } from 'react';
import { FilmCard } from './filmCard.tsx';

export const FilmCardWrap = memo(
  FilmCard,
  (prevProps, nextProps) => prevProps.film.id === nextProps.film.id,
);
