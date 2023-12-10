import { createReducer } from '@reduxjs/toolkit';
import {
  setGenre,
  fetchFilms,
  requireAuthorization,
  requireAuthorizationError,
  fetchFilmPromo,
  fetchFilmsFavorite,
  setFilmPromoOperation,
  fetchFilm,
  fetchSimilarFilms,
  fetchCommentsFilm,
} from './action';
import { initialState } from './initialState.ts';
import { FilmFullType } from '../types/film.ts';

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(fetchFilms, (state, action) => {
      state.films = { ...state.films, ...action.payload };
    })
    .addCase(fetchFilm, (state, action) => {
      state.film = {
        ...state.film,
        film: {
          ...state.film.film,
          ...action.payload,
        },
      };
    })
    .addCase(fetchSimilarFilms, (state, action) => {
      state.film = {
        ...state.film,
        similarFilms: {
          ...state.film.similarFilms,
          ...action.payload,
        },
      };
    })
    .addCase(fetchCommentsFilm, (state, action) => {
      state.film = {
        ...state.film,
        comments: {
          ...state.film.comments,
          ...action.payload,
        },
      };
    })
    .addCase(fetchFilmPromo, (state, action) => {
      state.filmPromo = {
        ...state.filmPromo,
        ...action.payload,
      };
    })
    .addCase(setFilmPromoOperation, (state, action) => {
      state.filmPromo = {
        ...state.filmPromo,
        data: {
          ...state.filmPromo.data,
          isFavorite: action.payload,
        } as FilmFullType,
      };
    })
    .addCase(fetchFilmsFavorite, (state, action) => {
      state.filmsFavorite = {
        ...state.filmsFavorite,
        ...action.payload,
      };
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = {
        ...state.authorizationStatus,
        data: action.payload,
      };
    })
    .addCase(requireAuthorizationError, (state, action) => {
      state.authorizationStatus = {
        ...state.authorizationStatus,
        error: action.payload,
      };
    });
});
export { reducer };
