import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const.ts';
import { PromoFilmProcess } from '../../types/state.ts';
import { fetchPromoFilmAction } from '../api-actions.ts';

const initialState: PromoFilmProcess = {
  loading: false,
  error: null,
  data: null,
};

export const promoFilmProcess = createSlice({
  name: NameSpace.PromoFilm,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPromoFilmAction.rejected, (state, value) => {
        state.data = null;
        state.loading = false;
        state.error = value.error.message ?? null;
      });
  },
});
