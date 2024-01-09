import { FilmType } from '../../types/film.ts';

export const DEFAULT_GENRE = 'All genres';
export const DEFAULT_FILM_AMOUNT = 8;
export const MAX_GENRE_AMOUNT = 9;
export const MAX_SIMILAR_FILMS_AMOUNT = 4;
export const getAvailableGenres = (films: FilmType[]) =>
  [
    DEFAULT_GENRE,
    ...[...new Set(films.map(({ genre }) => genre))].slice(0, MAX_GENRE_AMOUNT),
  ] as string[];
export const getInitialStateLengthFilms = (list: FilmType[]) =>
  Math.min(DEFAULT_FILM_AMOUNT, list.length);
