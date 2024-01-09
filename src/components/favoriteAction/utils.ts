import { OperationFilmFavorite } from '../../const.ts';

export const status = (isFavorite: null | boolean) =>
  isFavorite ? OperationFilmFavorite.DEL : OperationFilmFavorite.ADD;
