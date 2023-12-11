import { NameSpace } from '../../const.ts';
import { State } from '../../types/state.ts';
import { FilmFullType, FilmType } from '../../types/film.ts';
import { CommentType } from '../../types/filmReview.ts';

export const filmSelector = (state: State): FilmFullType | null =>
  state[NameSpace.Film].film.data;

export const errorFilmSelector = (state: State): string | null =>
  state[NameSpace.Film].film.error;

export const loadingStatusFilmSelector = (state: State): boolean =>
  state[NameSpace.Film].film.loading;

export const commentsSelector = (state: State): CommentType[] =>
  state[NameSpace.Film].comments.data;

export const errorCommentsSelector = (state: State): string | null =>
  state[NameSpace.Film].comments.error;

export const loadingStatusCommentsSelector = (state: State): boolean =>
  state[NameSpace.Film].comments.loading;

export const similarFilmsSelector = (state: State): FilmType[] =>
  state[NameSpace.Film].similarFilms.data;

export const errorSimilarFilmsSelector = (state: State): string | null =>
  state[NameSpace.Film].similarFilms.error;

export const loadingStatusSimilarFilmsSelector = (state: State): boolean =>
  state[NameSpace.Film].similarFilms.loading;
