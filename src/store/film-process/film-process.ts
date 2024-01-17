import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const.ts';
import { FilmProcess } from '../../types/state.ts';
import {
  fetchChangeStatusFilmFavoriteAction,
  fetchCommentsFilmAction,
  fetchFilmAction,
  fetchSimilarFilmsFilmAction,
} from '../api-actions.ts';

const initialState: FilmProcess = {
  film: {
    loading: false,
    error: null,
    film: null,
  },
  similarFilms: {
    loading: false,
    error: null,
    films: [],
  },
  comments: {
    loading: false,
    error: null,
    comments: [],
  },
  operation: {
    loading: false,
    error: null,
  },
};

export const filmProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    clear: (state) => {
      state.film.error = null;
      state.similarFilms.error = null;
      state.comments.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmAction.pending, (state) => {
        state.film = {
          ...state.film,
          loading: true,
        };
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = {
          loading: false,
          film: action.payload,
          error: null,
        };
      })
      .addCase(fetchFilmAction.rejected, (state, value) => {
        state.film = {
          film: null,
          loading: false,
          error: value.error.message ?? null,
        };
      })
      .addCase(fetchCommentsFilmAction.pending, (state) => {
        state.comments = {
          ...state.comments,
          loading: true,
        };
      })
      .addCase(fetchCommentsFilmAction.fulfilled, (state, action) => {
        state.comments = {
          error: null,
          loading: false,
          comments: action.payload,
        };
      })
      .addCase(fetchCommentsFilmAction.rejected, (state, value) => {
        state.comments = {
          ...state.comments,
          loading: false,
          error: value.error.message ?? null,
        };
      })
      .addCase(fetchSimilarFilmsFilmAction.pending, (state) => {
        state.similarFilms = {
          ...state.similarFilms,
          loading: true,
        };
      })
      .addCase(fetchSimilarFilmsFilmAction.fulfilled, (state, action) => {
        state.similarFilms = {
          error: null,
          loading: false,
          films: action.payload,
        };
      })
      .addCase(fetchSimilarFilmsFilmAction.rejected, (state, value) => {
        state.similarFilms = {
          ...state.similarFilms,
          loading: false,
          error: value.error.message ?? null,
        };
      })
      .addCase(fetchChangeStatusFilmFavoriteAction.pending, (state) => {
        state.operation = {
          ...state.operation,
          loading: true,
        };
      })
      .addCase(
        fetchChangeStatusFilmFavoriteAction.fulfilled,
        (state, action) => {
          state.operation = {
            ...state.operation,
            loading: false,
          };
          state.film = {
            ...state.film,
            film: action.payload,
          };
        },
      )
      .addCase(fetchChangeStatusFilmFavoriteAction.rejected, (state, value) => {
        state.operation = {
          loading: false,
          error: value.error.message ?? null,
        };
      });
  },
});

export const { clear } = filmProcess.actions;
