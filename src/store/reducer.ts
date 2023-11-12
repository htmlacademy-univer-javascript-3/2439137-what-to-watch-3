import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, getListFilmsByGenre } from './action';
import { films } from '../mocks/films.ts';

const DEFAULT_GENRE = 'All genres';

const initialState = {
  genre: DEFAULT_GENRE,
  listFilms: films,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const { genre } = action.payload;
      state.genre = genre;
    })
    .addCase(getListFilmsByGenre, (state) => {
      if (state.genre === DEFAULT_GENRE) {
        state.listFilms = films;
      } else {
        state.listFilms = films.filter(({ genre }) => genre === state.genre);
      }
    });
});
export { reducer };
