import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import { AxiosInstance } from 'axios';
import { FilmFullType, PromoFilmType, FilmType } from '../types/film.ts';
import { APIRoute } from '../services/const.ts';
import {
  FetchUserData,
  FetchFilmData,
  FetchFilmsFavoriteData,
} from '../types/fetchUserData.ts';
import { dropToken, saveToken } from '../services/token.ts';
import { UserData } from '../types/userData.ts';
import { CommentType } from '../types/filmReview.ts';

export const fetchFilmsAction = createAsyncThunk<
  FilmType[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { extra: api }) => {
  const { data } = await api.get<FilmType[]>(APIRoute.Films);
  return data;
});

export const fetchFilmAction = createAsyncThunk<
  FilmFullType,
  FetchFilmData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async ({ filmId }, { extra: api }) => {
  const { data } = await api.get<FilmFullType>(`${APIRoute.Films}/${filmId}`);
  return data;
});

export const fetchCommentsFilmAction = createAsyncThunk<
  CommentType[],
  FetchFilmData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchCommentFilm', async ({ filmId }, { extra: api }) => {
  const { data } = await api.get<CommentType[]>(
    `${APIRoute.FilmComments}/${filmId}`,
  );
  return data;
});

export const fetchSimilarFilmsFilmAction = createAsyncThunk<
  FilmType[],
  FetchFilmData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchSimilarFilms', async ({ filmId }, { extra: api }) => {
  const { data } = await api.get<FilmType[]>(
    `${APIRoute.Films}/${filmId}/similar`,
  );
  return data;
});

export const fetchPromoFilmAction = createAsyncThunk<
  PromoFilmType,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPromoFilm', async (_arg, { extra: api }) => {
  const { data } = await api.get<PromoFilmType>(APIRoute.FilmPromo);
  return data;
});

export const fetchFavoriteFilmsAction = createAsyncThunk<
  FilmType[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFavoriteFilms', async (_arg, { extra: api }) => {
  const { data } = await api.get<FilmType[]>(APIRoute.FilmFavorite);
  return data;
});

export const fetchChangeStatusFilmFavoriteAction = createAsyncThunk<
  FilmFullType,
  FetchFilmsFavoriteData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchFilmsFavoriteChangeStatus',
  async ({ filmId: filmId, status: status }, { extra: api }) => {
    const { data } = await api.post<FilmFullType>(
      `${APIRoute.FilmFavorite}/${filmId}/${status}`,
    );

    return data;
  },
);

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  await api.get(APIRoute.Login);
});

export const loginAction = createAsyncThunk<
  UserData,
  FetchUserData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ email, password }, { rejectWithValue, extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, {
        email,
        password,
      });
      saveToken(data.token);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});
