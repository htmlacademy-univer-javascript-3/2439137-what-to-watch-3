import { store } from '../store';
import { AuthorizationStatus } from '../const.ts';
import { UserData } from './userData.ts';
import { FilmFullType, PromoFilmType, FilmType } from './film.ts';
import { CommentType } from './filmReview.ts';

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: {
    error: string | null;
    data: AuthorizationStatus;
    loading: boolean;
  };
  userData: {
    error: {
      property: string[];
      messages: string[];
    };
    data: UserData | null;
    loading: boolean;
  };
};

export type FilmProcess = {
  film: {
    loading: boolean;
    error: string | null;
    data: FilmFullType | null;
  };
  similarFilms: {
    loading: boolean;
    error: string | null;
    data: FilmType[];
  };
  comments: {
    loading: boolean;
    error: string | null;
    data: CommentType[];
  };
  operation: {
    error: string | null;
    loading: boolean;
  };
};
export type FilmsProcess = {
  loading: boolean;
  error: string | null;
  data: FilmType[];
  currentGenre: string;
};

export type PromoFilmProcess = {
  loading: boolean;
  error: string | null;
  data: PromoFilmType | null;
};

export type FavoriteFilmsProcess = {
  loading: boolean;
  error: string | null;
  data: FilmType[];
};

export type State = ReturnType<typeof store.getState>;
