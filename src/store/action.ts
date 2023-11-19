import { createAction } from '@reduxjs/toolkit';
import { FilmType } from '../types/film.ts';
import {AppRoute, AuthorizationStatus} from '../const.ts';

export const setGenre = createAction<string>('catalog/setGenre');
export const resetCatalog = createAction('catalog/resetCatalog');
export const loadFilms = createAction<FilmType[]>('data/loadFilms');
export const setFilmsDataLoadingStatus = createAction<boolean>(
  'data/setFilmsDataLoadingStatus',
);
export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization',
);
export const getUser = createAction<AuthorizationStatus>(
  'user/getUser',
);
export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
