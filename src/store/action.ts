import { createAction } from '@reduxjs/toolkit';
import { FilmType } from '../types/film.ts';
import {AppRoute, AuthorizationStatus} from '../const.ts';

export const setGenre = createAction<string>('catalog/setGenre');
export const fetchFilms = createAction<FilmType[]>('data/dataFilms');
export const fetchFilmsLoadingStatus = createAction<boolean>('data/loadFilms');
export const fetchFilmsError = createAction<string | null>('data/errorFilms');
export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization',
);
export const getUser = createAction<AuthorizationStatus>(
  'user/getUser',
);
export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
