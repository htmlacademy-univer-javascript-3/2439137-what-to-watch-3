import { FilmType } from '../../types/film.ts';

export const DEFAULT_GENRE = 'All genres';
export const DEFAULT_FILM_AMOUNT = 8;
export const genres = (films: FilmType[]) =>
  [DEFAULT_GENRE, ...new Set(films.map(({ genre }) => genre))] as string[];
export const initialStateLengthFilms = (list: FilmType[]) =>
  Math.min(DEFAULT_FILM_AMOUNT, list.length);
