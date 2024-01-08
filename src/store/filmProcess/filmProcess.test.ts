import { FilmProcess } from '../../types/state.ts';
import {
  fetchChangeStatusFilmFavoriteAction,
  fetchCommentsFilmAction,
  fetchFilmAction,
  fetchSimilarFilmsFilmAction,
} from '../api-actions.ts';
import { FilmFullType, FilmType } from '../../types/film.ts';
import { filmProcess } from './filmProcess.ts';
import { CommentType } from '../../types/filmReview.ts';

const testFilm: FilmFullType = {
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

const testCommentsFilm: CommentType[] = [
  {
    id: 'testId',
    date: 'dateName',
    user: 'testUser',
    comment: 'testComment',
    rating: 0,
  },
];

const testSimilarFilms: FilmType[] = [
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

describe('filmProcess', () => {
  let state: FilmProcess;
  beforeEach(() => {
    state = {
      film: {
        loading: false,
        error: null,
        data: null,
      },
      similarFilms: {
        loading: false,
        error: null,
        data: [],
      },
      comments: {
        loading: false,
        error: null,
        data: [],
      },
      operation: {
        loading: false,
        error: null,
      },
    };
  });

  describe('fetch film', () => {
    it('should update film if fetchFilmAction fulfilled', () => {
      expect(
        filmProcess.reducer(state, {
          type: fetchFilmAction.fulfilled.type,
          payload: testFilm,
        }),
      ).toMatchObject({
        film: {
          loading: false,
          error: null,
          data: testFilm,
        },
        similarFilms: {
          loading: false,
          error: null,
          data: [],
        },
        comments: {
          loading: false,
          error: null,
          data: [],
        },
        operation: {
          loading: false,
          error: null,
        },
      });
    });
    it('should add error if fetchFilmAction rejected', () => {
      expect(
        filmProcess.reducer(state, {
          type: fetchFilmAction.rejected.type,
          error: { message: 'error' },
        }),
      ).toMatchObject({
        film: {
          loading: false,
          error: 'error',
          data: null,
        },
        similarFilms: {
          loading: false,
          error: null,
          data: [],
        },
        comments: {
          loading: false,
          error: null,
          data: [],
        },
        operation: {
          loading: false,
          error: null,
        },
      });
    });
  });

  describe('fetch comments film', () => {
    it('should update comments film if fetchCommentsFilmAction fulfilled', () => {
      expect(
        filmProcess.reducer(state, {
          type: fetchFilmAction.fulfilled.type,
          payload: testCommentsFilm,
        }),
      ).toMatchObject({
        film: {
          loading: false,
          error: null,
          data: testCommentsFilm,
        },
        similarFilms: {
          loading: false,
          error: null,
          data: [],
        },
        comments: {
          loading: false,
          error: null,
          data: [],
        },
        operation: {
          loading: false,
          error: null,
        },
      });
    });
    it('should add error if fetchCommentsFilmAction rejected', () => {
      expect(
        filmProcess.reducer(state, {
          type: fetchCommentsFilmAction.rejected.type,
          error: { message: 'error' },
        }),
      ).toMatchObject({
        film: {
          loading: false,
          error: null,
          data: null,
        },
        similarFilms: {
          loading: false,
          error: null,
          data: [],
        },
        comments: {
          loading: false,
          error: 'error',
          data: [],
        },
        operation: {
          loading: false,
          error: null,
        },
      });
    });
  });

  describe('fetch similar films', () => {
    it('should update similar films if fetchFilmAction fetchSimilarFilmsFilmAction', () => {
      expect(
        filmProcess.reducer(state, {
          type: fetchSimilarFilmsFilmAction.fulfilled.type,
          payload: testSimilarFilms,
        }),
      ).toMatchObject({
        film: {
          loading: false,
          error: null,
          data: null,
        },
        similarFilms: {
          loading: false,
          error: null,
          data: testSimilarFilms
        },
        comments: {
          loading: false,
          error: null,
          data: [],
        },
        operation: {
          loading: false,
          error: null,
        },
      });
    });
    it('should add error if fetchFilmAction rejected', () => {
      expect(
        filmProcess.reducer(state, {
          type: fetchSimilarFilmsFilmAction.rejected.type,
          error: { message: 'error' },
        }),
      ).toMatchObject({
        film: {
          loading: false,
          error: null,
          data: null,
        },
        similarFilms: {
          loading: false,
          error: 'error',
          data: [],
        },
        comments: {
          loading: false,
          error: null,
          data: [],
        },
        operation: {
          loading: false,
          error: null,
        },
      });
    });
  });

  describe('fetch film', () => {
    it('should update status film if fetchChangeStatusFilmFavoriteAction fulfilled', () => {
      expect(
        filmProcess.reducer(state, {
          type: fetchChangeStatusFilmFavoriteAction.fulfilled.type,
          payload: {
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
            isFavorite: true,
          },
        }),
      ).toMatchObject({
        film: {
          loading: false,
          error: null,
          data: {
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
            isFavorite: true,
          },
        },
        similarFilms: {
          loading: false,
          error: null,
          data: [],
        },
        comments: {
          loading: false,
          error: null,
          data: [],
        },
        operation: {
          loading: false,
          error: null,
        },
      });
    });
    it('should add error if fetchChangeStatusFilmFavoriteAction rejected', () => {
      state.film.data = testFilm;
      expect(
        filmProcess.reducer(state, {
          type: fetchChangeStatusFilmFavoriteAction.rejected.type,
          error: { message: 'error' },
        }),
      ).toMatchObject({
        film: {
          loading: false,
          error: null,
          data: testFilm,
        },
        similarFilms: {
          loading: false,
          error: null,
          data: [],
        },
        comments: {
          loading: false,
          error: null,
          data: [],
        },
        operation: {
          loading: false,
          error: 'error',
        },
      });
    });
  });
});
