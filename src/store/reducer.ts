import { createReducer } from '@reduxjs/toolkit';
import {
  setGenre,
  fetchFilms,
  requireAuthorization,
  setFilmsLoadingStatus,
  setFilmsError,
  requireAuthorizationError,
  fetchFilmPromo,
  setFilmPromoLoadingStatus,
  fetchFilmsFavorite,
  setFilmsFavoriteLoadingStatus,
  setFilmsFavoriteErrorOperation,
  setFilmPromoOperation,
  fetchFilm,
  setFilmLoadingStatus,
  setFilmError,
  fetchSimilarFilms,
  setSimilarFilmsError,
  setSimilarFilmsLoadingStatus,
  fetchCommentsFilm,
  setCommentsFilmLoadingStatus,
  setCommentsFilmError,
  setCommentFilmError, setCommentFilmLoadingStatus,
} from './action';
import { initialState } from './initialState.ts';

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(fetchFilms, (state, action) => {
      state.films = {
        ...state.films,
        data: action.payload,
      };
    })
    .addCase(setFilmsError, (state, action) => {
      state.films = {
        ...state.films,
        error: action.payload,
      };
    })
    .addCase(setFilmsLoadingStatus, (state, action) => {
      state.films = {
        ...state.films,
        loading: action.payload,
      };
    })
    .addCase(fetchFilm, (state, action) => {
      state.film = {
        ...state.film,
        film: {
          ...state.film.film,
          data: action.payload,
        },
      };
    })
    .addCase(setFilmError, (state, action) => {
      state.film = {
        ...state.film,
        film: {
          ...state.film.film,
          error: action.payload,
        },
      };
    })
    .addCase(setFilmLoadingStatus, (state, action) => {
      state.film = {
        ...state.film,
        film: {
          ...state.film.film,
          loading: action.payload,
        },
      };
    })
    .addCase(fetchSimilarFilms, (state, action) => {
      state.film = {
        ...state.film,
        similarFilms: {
          ...state.film.similarFilms,
          data: action.payload,
        },
      };
    })
    .addCase(setSimilarFilmsError, (state, action) => {
      state.film = {
        ...state.film,
        similarFilms: {
          ...state.film.similarFilms,
          error: action.payload,
        },
      };
    })
    .addCase(setSimilarFilmsLoadingStatus, (state, action) => {
      state.film = {
        ...state.film,
        similarFilms: {
          ...state.film.similarFilms,
          loading: action.payload,
        },
      };
    })
    .addCase(fetchCommentsFilm, (state, action) => {
      state.film = {
        ...state.film,
        comments: {
          ...state.film.comments,
          data: action.payload,
        },
      };
    })
    .addCase(setCommentsFilmError, (state, action) => {
      state.film = {
        ...state.film,
        comments: {
          ...state.film.comments,
          error: action.payload,
        },
      };
    })
    .addCase(setCommentsFilmLoadingStatus, (state, action) => {
      state.film = {
        ...state.film,
        comments: {
          ...state.film.comments,
          loading: action.payload,
        },
      };
    })
    .addCase(setCommentFilmError, (state, action) => {
      state.comment = {
        ...state.comment,
        error: action.payload,
      };
    })
    .addCase(setCommentFilmLoadingStatus, (state, action) => {
      state.comment = {
        ...state.comment,
        loading: action.payload,
      };
    })
    .addCase(fetchFilmPromo, (state, action) => {
      state.filmPromo = {
        ...state.filmPromo,
        data: action.payload,
      };
    })
    .addCase(setFilmPromoLoadingStatus, (state, action) => {
      state.filmPromo = {
        ...state.filmPromo,
        loading: action.payload,
      };
    })
    .addCase(setFilmPromoOperation, (state, action) => {
      state.filmPromo = {
        ...state.filmPromo,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data: {
          ...state.filmPromo.data,
          isFavorite: action.payload,
        },
      };
    })
    .addCase(fetchFilmsFavorite, (state, action) => {
      state.filmsFavorite = {
        ...state.filmsFavorite,
        data: action.payload,
      };
    })
    .addCase(setFilmsFavoriteLoadingStatus, (state, action) => {
      state.filmsFavorite = {
        ...state.filmsFavorite,
        loading: action.payload,
      };
    })
    .addCase(setFilmsFavoriteErrorOperation, (state, action) => {
      state.filmsFavorite = {
        ...state.filmsFavorite,
        errorOperation: action.payload,
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
