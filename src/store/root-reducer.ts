import { combineReducers } from '@reduxjs/toolkit';
import { userProcess } from './user-process/user-process.ts';
import { NameSpace } from '../const.ts';
import { filmProcess } from './film-process/film-process.ts';
import { promoFilmProcess } from './promo-film-process/promo-film-process.ts';
import { filmsProcess } from './films-process/films-process.ts';
import { favoriteFilmsProcess } from './favorite-films-process/favorite-films-process.ts';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Film]: filmProcess.reducer,
  [NameSpace.Films]: filmsProcess.reducer,
  [NameSpace.PromoFilm]: promoFilmProcess.reducer,
  [NameSpace.FavoriteFilms]: favoriteFilmsProcess.reducer,
});
