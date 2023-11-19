import { createReducer } from '@reduxjs/toolkit';
import {
  setGenre,
  loadFilms,
  resetCatalog,
  setFilmsDataLoadingStatus,
} from './action';
import { FilmType } from '../types/film.ts';

const DEFAULT_GENRE = 'All genres';

export type InitialState = {
  genre: string;
  films: FilmType[];
  isFilmsDataLoading: boolean;
};

const initialState: InitialState = {
  genre: DEFAULT_GENRE,
  films: [],
  isFilmsDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    })
    .addCase(resetCatalog, (state) => {
      const { genre } = initialState;
      state.genre = genre;
    });
});
export { reducer };
