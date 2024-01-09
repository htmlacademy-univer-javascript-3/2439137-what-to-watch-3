import { NameSpace } from '../../const.ts';
import { State } from '../../types/state.ts';
import { FilmType } from '../../types/film.ts';

export const favoriteFilmsSelector = (state: State): FilmType[] =>
  state[NameSpace.FavoriteFilms].data;

export const errorFavoriteFilmsSelector = (state: State): string | null =>
  state[NameSpace.FavoriteFilms].error;

export const loadingStatusFavoriteFilmsSelector = (state: State): boolean =>
  state[NameSpace.FavoriteFilms].loading;
