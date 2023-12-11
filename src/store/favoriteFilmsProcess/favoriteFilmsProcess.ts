import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const.ts';
import { FavoriteFilmsProcess } from '../../types/state.ts';
import {
  fetchFavoriteFilmsAction,
} from '../api-actions.ts';

const initialState: FavoriteFilmsProcess = {
  loading: false,
  error: null,
  data: [],
};

export const favoriteFilmsProcess = createSlice({
  name: NameSpace.FavoriteFilms,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFavoriteFilmsAction.rejected, (state, value) => {
        state.data = [];
        state.loading = false;
        state.error = value.error.message ?? null;
      });
  },
});
