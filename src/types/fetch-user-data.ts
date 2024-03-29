import { OperationFilmFavorite } from '../const.ts';

export type FetchUserData = {
  email: string;
  password: string;
};

export type FetchFilmsFavoriteData = {
  filmId: string;
  status: OperationFilmFavorite;
};

export type FetchFilmData = {
  filmId: string;
};
