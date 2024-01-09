import { NameSpace } from '../../const.ts';
import { State } from '../../types/state.ts';
import { PromoFilmType } from '../../types/film.ts';

export const promoFilmSelector = (state: State): PromoFilmType | null =>
  state[NameSpace.PromoFilm].data;

export const errorPromoFilmSelector = (state: State): string | null =>
  state[NameSpace.PromoFilm].error;

export const loadingStatusPromoFilmSelector = (state: State): boolean =>
  state[NameSpace.PromoFilm].loading;
