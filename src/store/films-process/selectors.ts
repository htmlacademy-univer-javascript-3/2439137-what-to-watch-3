import { NameSpace } from '../../const.ts';
import { State } from '../../types/state.ts';
import { FilmType } from '../../types/film.ts';

export const filmsSelector = (state: State): FilmType[] =>
  state[NameSpace.Films].data;

export const errorFilmsSelector = (state: State): string | null =>
  state[NameSpace.Films].error;

export const loadingStatusFilmsSelector = (state: State): boolean =>
  state[NameSpace.Films].loading;

export const genreSelector = (state: State): string =>
  state[NameSpace.Films].currentGenre;
