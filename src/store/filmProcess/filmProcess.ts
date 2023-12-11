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
    data: null,
  },
  similarFilms: {
    loading: false,
    error: null,
    data: [],
  },
  comments: {
    loading: false,
    error: null,
    data: [],
  },
  operation: {
    loading: false,
    error: null,
  },
};

export const filmProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {},
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
          ...state.film,
          loading: false,
          data: action.payload,
        };
      })
      .addCase(fetchFilmAction.rejected, (state, value) => {
        state.film = {
          data: null,
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
          ...state.comments,
          loading: false,
          data: action.payload,
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
          ...state.similarFilms,
          loading: false,
          data: action.payload,
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
            data: action.payload,
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
