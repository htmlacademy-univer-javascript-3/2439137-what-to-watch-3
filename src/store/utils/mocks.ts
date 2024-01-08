import { FilmFullType, FilmType, PromoFilmType } from '../../types/film.ts';
import { UserData } from '../../types/userData.ts';
import { CommentType } from '../../types/filmReview.ts';
import { Action } from '@reduxjs/toolkit';

export const extractActionsTypes = (actions: Action<string>[]) =>
  actions.map(({ type }) => type);

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
  released: 0,
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
