import { OperationFilmFavorite } from '../../const.ts';

export const getStatus = (isFavorite: null | boolean): OperationFilmFavorite =>
  isFavorite ? OperationFilmFavorite.Del : OperationFilmFavorite.Add;
