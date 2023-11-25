import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import { AxiosError, AxiosInstance } from 'axios';
import { FilmType } from '../types/film.ts';
import { APIRoute } from '../services/const.ts';
import {
  fetchFilms,
  fetchFilmsLoadingStatus,
  fetchFilmsError,
  requireAuthorization,
  requireAuthorizationError,
} from './action.ts';
import { AuthorizationStatus } from '../const.ts';
import { AuthData } from '../types/authData.ts';
import { dropToken, saveToken } from '../services/token.ts';
import { UserData } from '../types/userData.ts';

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
    dispatch(fetchFilmsLoadingStatus(true));
    const { data } = await api.get<FilmType[]>(APIRoute.Films);
    dispatch(fetchFilmsLoadingStatus(false));
    dispatch(fetchFilms(data));
  } catch (error) {
    if (error instanceof AxiosError) {
      dispatch(fetchFilmsError(error.message));
    }
  }
});

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
  AuthData,
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
  AuthData,
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
