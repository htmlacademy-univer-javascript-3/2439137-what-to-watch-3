import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import { AxiosError, AxiosInstance } from 'axios';
import { FilmFullType, FilmPromoType, FilmType } from '../types/film.ts';
import { APIRoute } from '../services/const.ts';
import {
  fetchFilms,
  requireAuthorization,
  requireAuthorizationError,
  fetchFilmPromo,
  fetchFilmsFavorite,
  setFilmPromoOperation,
  fetchFilm,
  fetchSimilarFilms,
  fetchCommentsFilm,
} from './action.ts';
import { AuthorizationStatus } from '../const.ts';
import {
  FetchData,
  FetchFilmData,
  FetchFilmsFavoriteData,
} from '../types/fetchData.ts';
import { dropToken, saveToken } from '../services/token.ts';
import { UserData } from '../types/userData.ts';
import { CommentType } from '../types/filmReview.ts';

export const fetchFilmsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { dispatch, extra: api }) => {
  try {
    dispatch(fetchFilms({ loading: true }));
    const { data } = await api.get<FilmType[]>(APIRoute.Films);
    dispatch(fetchFilms({ data: data, loading: false }));
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(fetchFilms({ error: error.message, loading: false }));
    }
  }
});

export const fetchFilmAction = createAsyncThunk<
  void,
  FetchFilmData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async ({ filmId }, { dispatch, extra: api }) => {
  try {
    dispatch(fetchFilm({ loading: true }));
    const { data } = await api.get<FilmFullType>(`${APIRoute.Films}/${filmId}`);
    dispatch(fetchFilm({ data: data, loading: false }));
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(fetchFilm({ error: error.message, loading: false }));
    }
  }
});

export const fetchCommentsFilmAction = createAsyncThunk<
  void,
  FetchFilmData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchCommentFilm', async ({ filmId }, { dispatch, extra: api }) => {
  try {
    dispatch(fetchCommentsFilm({ loading: true }));
    const { data } = await api.get<CommentType[]>(
      `${APIRoute.FilmComments}/${filmId}`,
    );
    dispatch(fetchCommentsFilm({ data: data, loading: false }));
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(fetchCommentsFilm({ error: error.message, loading: false }));
    }
  }
});

export const fetchSimilarFilmsAction = createAsyncThunk<
  void,
  FetchFilmData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchSimilarFilms', async ({ filmId }, { dispatch, extra: api }) => {
  try {
    dispatch(fetchSimilarFilms({ loading: true }));
    const { data } = await api.get<FilmType[]>(
      `${APIRoute.Films}/${filmId}/similar`,
    );
    dispatch(fetchSimilarFilms({ data: data, loading: false }));
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(fetchSimilarFilms({ error: error.message, loading: false }));
    }
  }
});

export const fetchFilmPromoAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilmPromo', async (_arg, { dispatch, extra: api }) => {
  try {
    dispatch(fetchFilmPromo({ loading: true }));
    const { data } = await api.get<FilmPromoType>(APIRoute.FilmPromo);
    dispatch(fetchFilmPromo({ data: data, loading: false }));
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(fetchFilmPromo({ error: error.message, loading: false }));
    }
  }
});

export const fetchFilmsFavoriteAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilmsFavorite', async (_arg, { dispatch, extra: api }) => {
  try {
    dispatch(fetchFilmsFavorite({ loading: true }));
    const { data } = await api.get<FilmType[]>(APIRoute.FilmFavorite);
    dispatch(fetchFilmsFavorite({ data: data, loading: false }));
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(fetchFilmsFavorite({ error: error.message, loading: false }));
    }
  }
});

export const fetchFilmsFavoriteChangeStatusAction = createAsyncThunk<
  void,
  FetchFilmsFavoriteData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchFilmsFavoriteChangeStatus',
  async ({ filmId: filmId, status: status }, { dispatch, extra: api }) => {
    const { data } = await api.post<FilmPromoType>(
      `${APIRoute.FilmFavorite}/${filmId}/${status}`,
    );
    dispatch(fetchFilmsFavoriteAction());
    dispatch(setFilmPromoOperation(data.isFavorite));
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
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  FetchData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ email: email, password: password }, { dispatch, extra: api }) => {
    try {
      const {
        data: { token },
      } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      try {
        if (error instanceof AxiosError && error && error.response) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
          const result = error.response.data.details.reduce(
            (
              accumulator: {
                property: string[];
                messages: string[];
              },
              currentValue: {
                property: string;
                messages: string[];
              },
            ) => {
              const property = currentValue.property;
              const messages = currentValue.messages;
              return {
                property: [...accumulator.property, property],
                messages: [...accumulator.messages, ...messages],
              };
            },
            {
              property: new Array<string>(),
              messages: new Array<string>(),
            } as {
              property: string[];
              messages: string[];
            },
          ) as {
            property: string[];
            messages: string[];
          };
          dispatch(
            requireAuthorizationError({
              property: result.property,
              messages: result.messages,
            }),
          );
        }
      } catch (e) {
        dispatch(
          requireAuthorizationError({
            property: [],
            messages: [],
          }),
        );
      }
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
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});
