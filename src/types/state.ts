import { store } from '../store';
import { AuthorizationStatus } from '../const.ts';
import { UserData } from './userData.ts';
import { FilmFullType, PromoFilmType, FilmType } from './film.ts';
import { CommentType } from './film-review.ts';

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: {
    error: string | null;
    status: AuthorizationStatus;
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
    film: FilmFullType | null;
  };
  similarFilms: {
    loading: boolean;
    error: string | null;
    films: FilmType[];
  };
  comments: {
    loading: boolean;
    error: string | null;
    comments: CommentType[];
  };
  operation: {
    error: string | null;
    loading: boolean;
  };
};
export type FilmsProcess = {
  loading: boolean;
  error: string | null;
  films: FilmType[];
  currentGenre: string;
};

export type PromoFilmProcess = {
  loading: boolean;
  error: string | null;
  film: PromoFilmType | null;
};

export type FavoriteFilmsProcess = {
  loading: boolean;
  error: string | null;
  films: FilmType[];
};

export type State = ReturnType<typeof store.getState>;
