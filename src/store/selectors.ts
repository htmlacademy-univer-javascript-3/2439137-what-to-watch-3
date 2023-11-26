import { InitialState } from './initialState.ts';

export const filmsSelector = (state: InitialState) => state.films.data;
export const filmsLoadingStatusSelector = (state: InitialState) =>
  state.films.loading;
export const filmSelector = (state: InitialState) => state.film.film.data;
export const filmLoadingStatusSelector = (state: InitialState) =>
  state.film.film.loading;
export const similarFilmsSelector = (state: InitialState) =>
  state.film.similarFilms.data;
export const similarFilmsLoadingStatusSelector = (state: InitialState) =>
  state.film.similarFilms.loading;
export const commentsFilmSelector = (state: InitialState) =>
  state.film.comments.data;
export const commentsFilmLoadingStatusSelector = (state: InitialState) =>
  state.film.comments.loading;
export const filmPromoSelector = (state: InitialState) => state.filmPromo.data;
export const filmPromoLoadingStatusSelector = (state: InitialState) =>
  state.filmPromo.loading;
export const filmsFavoriteSelector = (state: InitialState) =>
  state.filmsFavorite.data;
export const filmsFavoriteLoadingStatusSelector = (state: InitialState) =>
  state.filmsFavorite.loading;

export const genreSelector = (state: InitialState) => state.genre;

export const authorizationStatusSelector = (state: InitialState) =>
  state.authorizationStatus;
