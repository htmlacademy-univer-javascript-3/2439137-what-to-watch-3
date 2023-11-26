import { FilmFullType, FilmPromoType, FilmType } from '../types/film.ts';
import { AuthorizationStatus } from '../const.ts';
import { UserData } from '../types/userData.ts';
import { CommentType } from '../types/filmReview.ts';

const DEFAULT_GENRE = 'All genres';

export type InitialState = {
  genre: string;
  films: {
    loading: boolean;
    error: string | null;
    data: FilmType[];
  };
  film: {
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
  };
  filmPromo: {
    loading: boolean;
    data: FilmPromoType | null;
  };
  filmsFavorite: {
    loading: boolean;
    data: FilmType[];
    errorOperation: string | null;
  };
  comment: {
    loading: boolean;
    error: string | null;
  };
  authorizationStatus: {
    error: {
      property: string[];
      messages: string[];
    };
    data: AuthorizationStatus;
  };
  userData: UserData | null;
};

export const initialState: InitialState = {
  genre: DEFAULT_GENRE,
  films: {
    loading: false,
    error: null,
    data: [],
  },
  film: {
    film: {
      loading: false,
      error: null,
      data: null,
    },
    similarFilms: {
      loading: false,
      error: null,
      data: [],
    },
    comments: {
      loading: false,
      error: null,
      data: [],
    },
  },
  filmPromo: {
    loading: false,
    data: null,
  },
  filmsFavorite: {
    loading: false,
    data: [],
    errorOperation: null,
  },
  comment: {
    loading: false,
    error: null,
  },
  authorizationStatus: {
    error: {
      property: [],
      messages: [],
    },
    data: AuthorizationStatus.Unknown,
  },
  userData: null,
};
