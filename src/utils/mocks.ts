import { ThunkDispatch } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { FilmFullType, FilmType, PromoFilmType } from '../types/film.ts';
import { UserData } from '../types/userData.ts';
import { CommentType } from '../types/film-review.ts';
import { State } from '../types/state.ts';
import { AuthorizationStatus } from '../const.ts';
import { DEFAULT_GENRE } from '../components/catalog/utils.ts';
import { createAPI } from '../services/api.ts';

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;

export const testUser: UserData = {
  name: 'TestName',
  avatarUrl: 'test/avatar',
  email: 'test@test.com',
  token: 'testToken',
};

export const testFavoriteFilms: FilmType[] = [
  {
    id: 'testId',
    name: 'TestName',
    previewImage: 'test/previewImage',
    previewVideoLink: 'test/previewVideoLink',
    genre: 'testGenre',
  },
  {
    id: 'testId2',
    name: 'TestName2',
    previewImage: 'test/previewImage2',
    previewVideoLink: 'test/previewVideoLink2',
    genre: 'testGenre2',
  },
  {
    id: 'testId3',
    name: 'TestName3',
    previewImage: 'test/previewImage3',
    previewVideoLink: 'test/previewVideoLink3',
    genre: 'testGenre3',
  },
];

export const testFilm: FilmFullType = {
  id: 'testId',
  name: 'TestName',
  posterImage: 'test/posterImage',
  backgroundImage: 'test/backgroundImage',
  backgroundColor: 'testBackgroundColor',
  videoLink: 'test/videoLink',
  description: 'testDescription',
  rating: 0,
  scoresCount: 0,
  director: 'testDirector',
  starring: ['testStarring'],
  runTime: 0,
  genre: 'testGenre',
  released: 2020,
  isFavorite: false,
};

export const testCommentsFilm: CommentType[] = [
  {
    id: 'testId',
    date: 'dateName',
    user: 'testUser',
    comment: 'testComment',
    rating: 0,
  },
];

export const testSimilarFilms: FilmType[] = [
  {
    id: 'testId',
    name: 'TestName',
    previewImage: 'test/previewImage',
    previewVideoLink: 'test/previewVideoLink',
    genre: 'testGenre',
  },
  {
    id: 'testId2',
    name: 'TestName2',
    previewImage: 'test/previewImage2',
    previewVideoLink: 'test/previewVideoLink2',
    genre: 'testGenre2',
  },
  {
    id: 'testId3',
    name: 'TestName3',
    previewImage: 'test/previewImage3',
    previewVideoLink: 'test/previewVideoLink3',
    genre: 'testGenre3',
  },
];

export const testFilms: FilmType[] = [
  {
    id: 'testId',
    name: 'TestName',
    previewImage: 'test/previewImage',
    previewVideoLink: 'test/previewVideoLink',
    genre: 'testGenre',
  },
  {
    id: 'testId1',
    name: 'TestName1',
    previewImage: 'test/previewImage1',
    previewVideoLink: 'test/previewVideoLink1',
    genre: 'testGenre1',
  },
];

export const testPromoFilm: PromoFilmType = {
  id: 'testId',
  name: 'TestName',
  posterImage: 'test/posterImage',
  backgroundImage: 'test/backgroundImage',
  videoLink: 'test/videoLink',
  genre: 'testGenre',
  released: 0,
  isFavorite: true,
};

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  USER: {
    authorizationStatus: {
      error: null,
      status: AuthorizationStatus.NoAuth,
      loading: false,
    },
    userData: {
      error: {
        property: [],
        messages: [],
      },
      data: testUser,
      loading: false,
    },
  },
  FILM: {
    film: {
      loading: false,
      error: null,
      film: testFilm,
    },
    similarFilms: {
      loading: false,
      error: null,
      films: testSimilarFilms,
    },
    comments: {
      loading: false,
      error: null,
      comments: testCommentsFilm,
    },
    operation: {
      error: null,
      loading: false,
    },
  },
  FILMS: {
    loading: false,
    error: null,
    films: testFilms,
    currentGenre: DEFAULT_GENRE,
  },
  PROMO_FILM: {
    loading: false,
    error: null,
    film: testPromoFilm,
  },
  FAVORITE_FILMS: {
    loading: false,
    error: null,
    films: testFavoriteFilms,
  },
  ...(initialState ?? {}),
});
