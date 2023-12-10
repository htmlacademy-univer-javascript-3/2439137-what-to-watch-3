import { createAction } from '@reduxjs/toolkit';
import { FilmFullType, FilmPromoType, FilmType } from '../types/film.ts';
import { AuthorizationStatus } from '../const.ts';
import { CommentType } from '../types/filmReview.ts';

export const setGenre = createAction<string>('catalog/setGenre');
export const fetchFilms = createAction<{
  data?: FilmType[];
  loading?: boolean;
  error?: string | null;
}>('data/dataFilms');
export const fetchFilm = createAction<{
  data?: FilmFullType;
  loading?: boolean;
  error?: string | null;
}>('data/dataFilm');
export const fetchSimilarFilms = createAction<{
  data?: FilmType[];
  loading?: boolean;
  error?: string | null;
}>('data/dataSimilarFilms');

export const fetchCommentsFilm = createAction<{
  data?: CommentType[];
  loading?: boolean;
  error?: string | null;
}>('data/dataCommentsFilm');
export const fetchFilmPromo = createAction<{
  data?: FilmPromoType;
  loading?: boolean;
  error?: string | null;
}>('data/dataFilmPromo');
export const fetchFilmsFavorite = createAction<{
  data?: FilmType[];
  loading?: boolean;
  error?: string | null;
}>('data/dataFilmsFavorite');
export const setFilmPromoOperation = createAction<boolean>(
  'data/setFilmPromoOperation',
);
export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization',
);
export const requireAuthorizationError = createAction<{
  property: string[];
  messages: string[];
}>('user/requireAuthorizationError');
export const getUser = createAction<AuthorizationStatus>('user/getUser');
