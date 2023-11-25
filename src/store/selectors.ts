import { InitialState } from './reducer.ts';

export const filmsSelector = (state: InitialState) => state.films.data;
export const filmsSelectorLoadingStatue = (state: InitialState) =>
  state.films.loading;
export const filmsSelectorError = (state: InitialState) => state.films.error;

export const genreSelector = (state: InitialState) => state.genre;

export const authorizationStatusSelector = (state: InitialState) =>
  state.authorizationStatus;
