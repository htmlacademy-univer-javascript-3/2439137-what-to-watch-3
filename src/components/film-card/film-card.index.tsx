import { memo } from 'react';
import { FilmCard } from './film-card.tsx';

export const WrapFilmCard = memo(
  FilmCard,
  (prevProps, nextProps) => prevProps.film.id === nextProps.film.id,
);
