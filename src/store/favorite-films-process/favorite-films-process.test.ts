import { FavoriteFilmsProcess } from '../../types/state.ts';
import { fetchFavoriteFilmsAction } from '../api-actions.ts';
import { favoriteFilmsProcess } from './favorite-films-process.ts';
import { testFavoriteFilms } from '../../utils/mocks.ts';

describe('favoriteFilmsProcess', () => {
  let state: FavoriteFilmsProcess;
  beforeEach(() => {
    state = {
      loading: false,
      error: null,
      films: [],
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
        films: testFavoriteFilms,
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
        films: [],
      });
    });
  });
});
