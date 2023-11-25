import { createReducer } from '@reduxjs/toolkit';
import {
  setGenre,
  fetchFilms,
  requireAuthorization,
  fetchFilmsLoadingStatus,
  fetchFilmsError, requireAuthorizationError,
} from './action';
import { FilmType } from '../types/film.ts';
import { AuthorizationStatus } from '../const.ts';
import { UserData } from '../types/userData.ts';

const DEFAULT_GENRE = 'All genres';

export type InitialState = {
  genre: string;
  films: {
    loading: boolean;
    error: string | null;
    data: FilmType[];
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

const initialState: InitialState = {
  genre: DEFAULT_GENRE,
  films: {
    loading: false,
    error: null,
    data: [],
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

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(fetchFilms, (state, action) => {
      state.films = {
        ...state.films,
        data: action.payload,
      };
    })
    .addCase(fetchFilmsError, (state, action) => {
      state.films = {
        ...state.films,
        error: action.payload,
      };
    })
    .addCase(fetchFilmsLoadingStatus, (state, action) => {
      state.films = {
        ...state.films,
        loading: action.payload,
      };
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = {
        ...state.authorizationStatus,
        data: action.payload,
      };
    })
    .addCase(requireAuthorizationError, (state, action) => {
      state.authorizationStatus = {
        ...state.authorizationStatus,
        error: action.payload,
      };
    });
});
export { reducer };
