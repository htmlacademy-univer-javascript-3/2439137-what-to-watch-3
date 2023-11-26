import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import { AxiosError, AxiosInstance } from 'axios';
import { FilmFullType, FilmPromoType, FilmType } from '../types/film.ts';
import { APIRoute } from '../services/const.ts';
import {
  fetchFilms,
  setFilmsLoadingStatus,
  setFilmsError,
  requireAuthorization,
  requireAuthorizationError,
  setFilmPromoLoadingStatus,
  fetchFilmPromo,
  fetchFilmsFavorite,
  setFilmsFavoriteLoadingStatus,
  setFilmPromoOperation,
  setFilmLoadingStatus,
  fetchFilm,
  setSimilarFilmsLoadingStatus,
  fetchSimilarFilms,
  setCommentsFilmLoadingStatus,
  fetchCommentsFilm,
  setCommentFilmLoadingStatus,
} from './action.ts';
import { AuthorizationStatus } from '../const.ts';
import {
  CommentFilmData,
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
    dispatch(setFilmsLoadingStatus(true));
    const { data } = await api.get<FilmType[]>(APIRoute.Films);
    dispatch(setFilmsLoadingStatus(false));
    dispatch(fetchFilms(data));
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(setFilmsError(error.message));
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
    dispatch(setFilmLoadingStatus(true));
    const { data } = await api.get<FilmFullType>(`${APIRoute.Films}/${filmId}`);
    dispatch(setFilmLoadingStatus(false));
    dispatch(fetchFilm(data));
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(setFilmsError(error.message));
    }
  }
});

export const fetchCommentFilmAction = createAsyncThunk<
  void,
  FetchFilmData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchCommentFilm', async ({ filmId }, { dispatch, extra: api }) => {
  try {
    dispatch(setCommentsFilmLoadingStatus(true));
    const { data } = await api.get<CommentType[]>(
      `${APIRoute.FilmComments}/${filmId}`,
    );
    dispatch(setCommentsFilmLoadingStatus(false));
    dispatch(fetchCommentsFilm(data));
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(setFilmsError(error.message));
    }
  }
});

export const fetchAddCommentFilmAction = createAsyncThunk<
  void,
  CommentFilmData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchAddCommentFilm',
  async ({ filmId, comment, rating }, { dispatch, extra: api }) => {
    try {
      dispatch(setCommentFilmLoadingStatus(true));
      await api.post(`${APIRoute.FilmComments}/${filmId}`, { comment, rating });
      dispatch(setCommentFilmLoadingStatus(false));
      dispatch(fetchCommentFilmAction({ filmId }));
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(setFilmsError(error.message));
      }
    }
  },
);

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
    dispatch(setSimilarFilmsLoadingStatus(true));
    const { data } = await api.get<FilmType[]>(
      `${APIRoute.Films}/${filmId}/similar`,
    );
    dispatch(setSimilarFilmsLoadingStatus(false));
    dispatch(fetchSimilarFilms(data));
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(setFilmsError(error.message));
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
    dispatch(setFilmPromoLoadingStatus(true));
    const { data } = await api.get<FilmPromoType>(APIRoute.FilmPromo);
    dispatch(setFilmPromoLoadingStatus(false));
    dispatch(fetchFilmPromo(data));
  } catch (error) {
    dispatch(setFilmPromoLoadingStatus(true));
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
    dispatch(setFilmsFavoriteLoadingStatus(true));
    const { data } = await api.get<FilmType[]>(APIRoute.FilmFavorite);
    dispatch(setFilmsFavoriteLoadingStatus(false));
    dispatch(fetchFilmsFavorite(data));
  } catch (error) {
    dispatch(setFilmsFavoriteLoadingStatus(true));
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
