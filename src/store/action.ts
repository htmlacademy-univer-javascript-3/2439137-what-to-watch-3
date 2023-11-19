import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction<{ genre: string }>(
  'catalog/changeGenre',
);
export const getListFilmsByGenre = createAction('catalog/getListFilmsByGenre');

export const changeCountListGenres = createAction<{ countListGenres: number }>(
  'catalog/changeCountListGenres',
);

export const resetCatalog = createAction('catalog/resetCatalog');
