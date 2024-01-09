import { memo } from 'react';
import { CatalogFilms } from './catalog-films.tsx';

export const WrapCatalogFilms = memo(
  CatalogFilms,
  (prevProps, nextProps) => prevProps.films.length === nextProps.films.length,
);
