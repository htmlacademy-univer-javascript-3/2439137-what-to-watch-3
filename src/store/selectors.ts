import { InitialState } from './reducer.ts';

export const filmsSelector = (state: InitialState) => state.films;

export const genreSelector = (state: InitialState) => state.genre;

export const isFilmsDataLoadingSelector = (state: InitialState) =>
  state.isFilmsDataLoading;

export const authorizationStatusSelector = (state: InitialState) =>
  state.authorizationStatus;
