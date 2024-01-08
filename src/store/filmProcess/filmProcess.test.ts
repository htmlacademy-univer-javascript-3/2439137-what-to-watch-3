import { FilmProcess } from '../../types/state.ts';
import {
  fetchChangeStatusFilmFavoriteAction,
  fetchCommentsFilmAction,
  fetchFilmAction,
  fetchSimilarFilmsFilmAction,
} from '../api-actions.ts';
import { filmProcess } from './filmProcess.ts';
import {
  testCommentsFilm,
  testFilm,
  testSimilarFilms,
} from '../../utils/mocks.ts';

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
          data: testSimilarFilms,
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
