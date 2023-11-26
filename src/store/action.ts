import { createAction } from '@reduxjs/toolkit';
import { FilmFullType, FilmPromoType, FilmType } from '../types/film.ts';
import { AuthorizationStatus } from '../const.ts';
import { CommentType } from '../types/filmReview.ts';

export const setGenre = createAction<string>('catalog/setGenre');
export const fetchFilms = createAction<FilmType[]>('data/dataFilms');
export const setFilmsLoadingStatus = createAction<boolean>('data/setLoadFilms');
export const setFilmsError = createAction<string | null>('data/setErrorFilms');
export const fetchFilm = createAction<FilmFullType>('data/dataFilm');
export const setFilmLoadingStatus = createAction<boolean>('data/setLoadFilm');
export const setFilmError = createAction<string | null>('data/setErrorFilm');
export const fetchSimilarFilms = createAction<FilmType[]>(
  'data/dataSimilarFilms',
);
export const setSimilarFilmsLoadingStatus = createAction<boolean>(
  'data/setLoadSimilarFilms',
);
export const setSimilarFilmsError = createAction<string | null>(
  'data/setErrorSimilarFilms',
);

export const fetchCommentsFilm = createAction<CommentType[]>(
  'data/dataCommentsFilm',
);
export const setCommentsFilmLoadingStatus = createAction<boolean>(
  'data/setLoadCommentsFilm',
);
export const setCommentsFilmError = createAction<string | null>(
  'data/setErrorCommentsFilm',
);
export const setCommentFilmLoadingStatus = createAction<boolean>(
  'data/setLoadCommentFilm',
);
export const setCommentFilmError = createAction<string | null>(
  'data/setErrorCommentFilm',
);
export const fetchFilmPromo = createAction<FilmPromoType>('data/dataFilmPromo');
export const setFilmPromoLoadingStatus = createAction<boolean>(
  'data/setLoadFilmPromo',
);
export const fetchFilmsFavorite = createAction<FilmType[]>(
  'data/dataFilmsFavorite',
);
export const setFilmsFavoriteLoadingStatus = createAction<boolean>(
  'data/setLoadFilmsFavorite',
);
export const setFilmsFavoriteErrorOperation = createAction<string | null>(
  'data/setErrorOperationFilmsFavorite',
);
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
