import { createAction } from '@reduxjs/toolkit';
import { FilmType } from '../types/film.ts';

export const setGenre = createAction<string>('catalog/setGenre');
export const loadFilms = createAction<FilmType[]>('data/loadFilms');
export const setFilmsDataLoadingStatus = createAction<boolean>(
  'data/setFilmsDataLoadingStatus',
);
export const resetCatalog = createAction('catalog/resetCatalog');
