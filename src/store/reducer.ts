import { createReducer } from '@reduxjs/toolkit';
import {
  changeCountListGenres,
  changeGenre,
  getListFilmsByGenre,
  resetCatalog,
} from './action';
import { films } from '../mocks/films.ts';
import { initialStateCountFilms } from '../components/catalog/utils.ts';

const DEFAULT_GENRE = 'All genres';

const initialState = {
  genre: DEFAULT_GENRE,
  listFilms: films,
  countListGenres: initialStateCountFilms(films),
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
        state.countListGenres = initialStateCountFilms(state.listFilms);
      } else {
        const listFilms = films.filter(({ genre }) => genre === state.genre);
        state.listFilms = listFilms;
        state.countListGenres = initialStateCountFilms(listFilms);
      }
    })
    .addCase(changeCountListGenres, (state, action) => {
      const { countListGenres } = action.payload;
      state.countListGenres = countListGenres;
    })
    .addCase(resetCatalog, (state) => {
      const { genre, listFilms, countListGenres } = initialState;
      state.genre = genre;
      state.listFilms = listFilms;
      state.countListGenres = countListGenres;
    });
});
export { reducer };
