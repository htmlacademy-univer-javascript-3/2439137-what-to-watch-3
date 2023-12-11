import { combineReducers } from '@reduxjs/toolkit';
import { userProcess } from './userProcess/userProcess.ts';
import { NameSpace } from '../const.ts';
import { filmProcess } from './filmProcess/filmProcess.ts';
import { promoFilmProcess } from './promoFilmProcess/promoFilmProcess.ts';
import { filmsProcess } from './filmsProcess/filmsProcess.ts';
import { favoriteFilmsProcess } from './favoriteFilmsProcess/favoriteFilmsProcess.ts';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Film]: filmProcess.reducer,
  [NameSpace.Films]: filmsProcess.reducer,
  [NameSpace.PromoFilm]: promoFilmProcess.reducer,
  [NameSpace.FavoriteFilms]: favoriteFilmsProcess.reducer,
});
