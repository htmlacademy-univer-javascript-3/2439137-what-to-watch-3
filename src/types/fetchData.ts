import { OperationFilmFavorite } from '../const.ts';

export type FetchData = {
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

export type CommentFilmData = {
  filmId: string;
  comment: string;
  rating: number;
};
