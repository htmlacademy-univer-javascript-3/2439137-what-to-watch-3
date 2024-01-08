import { FavoriteFilmsProcess } from '../../types/state.ts';
import { fetchFavoriteFilmsAction } from '../api-actions.ts';
import { FilmType } from '../../types/film.ts';
import { favoriteFilmsProcess } from './favoriteFilmsProcess.ts';

const testFavoriteFilms: FilmType[] = [
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

describe('favoriteFilmsProcess', () => {
  let state: FavoriteFilmsProcess;
  beforeEach(() => {
    state = {
      loading: false,
      error: null,
      data: [],
    };
  });

  describe('fetch favorite films', () => {
    it('should update films if fetchFavoriteFilmsAction fulfilled', () => {
      expect(
        favoriteFilmsProcess.reducer(state, {
          type: fetchFavoriteFilmsAction.fulfilled.type,
          payload: testFavoriteFilms,
        }),
      ).toMatchObject({
        loading: false,
        error: null,
        data: testFavoriteFilms,
      });
    });
    it('should add error if fetchFavoriteFilmsAction rejected', () => {
      expect(
        favoriteFilmsProcess.reducer(state, {
          type: fetchFavoriteFilmsAction.rejected.type,
          error: { message: 'error' },
        }),
      ).toMatchObject({
        loading: false,
        error: 'error',
        data: [],
      });
    });
  });
});
