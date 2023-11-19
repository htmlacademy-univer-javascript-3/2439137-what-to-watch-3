import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import { AxiosInstance } from 'axios';
import { FilmType } from '../types/film.ts';
import { APIRoute } from '../services/const.ts';
import { loadFilms, setFilmsDataLoadingStatus } from './action.ts';

export const fetchFilmsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { dispatch, extra: api }) => {
  dispatch(setFilmsDataLoadingStatus(true));
  const { data } = await api.get<FilmType[]>(APIRoute.Films);
  dispatch(setFilmsDataLoadingStatus(false));
  dispatch(loadFilms(data));
});
