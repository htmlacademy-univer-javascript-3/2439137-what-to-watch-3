import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const.ts';
import { FilmsProcess } from '../../types/state.ts';
import { fetchFilmsAction } from '../api-actions.ts';
import { DEFAULT_GENRE } from '../../components/catalog/utils.ts';

const initialState: FilmsProcess = {
  loading: false,
  error: null,
  data: [],
  currentGenre: DEFAULT_GENRE,
};

export const filmsProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<string>) => {
      state.currentGenre = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFilmsAction.rejected, (state, value) => {
        state.data = [];
        state.loading = false;
        state.error = value.error.message ?? null;
      });
  },
});

export const { setGenre } = filmsProcess.actions;
