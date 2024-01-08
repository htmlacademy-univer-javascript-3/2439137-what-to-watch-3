import { FilmsProcess } from '../../types/state.ts';
import { fetchFilmsAction } from '../api-actions.ts';
import { FilmType } from '../../types/film.ts';
import { filmsProcess, setGenre } from './filmsProcess.ts';
import { DEFAULT_GENRE } from '../../components/catalog/utils.ts';

const testFilms: FilmType[] = [
  {
    id: 'testId',
    name: 'TestName',
    previewImage: 'test/previewImage',
    previewVideoLink: 'test/previewVideoLink',
    genre: 'testGenre',
  },
];

describe('filmsProcess', () => {
  let state: FilmsProcess;
  beforeEach(() => {
    state = {
      loading: false,
      error: null,
      data: [],
      currentGenre: DEFAULT_GENRE,
    };
  });

  describe('fetch films', () => {
    it('should update films if fetchFilmsAction fulfilled', () => {
      expect(
        filmsProcess.reducer(state, {
          type: fetchFilmsAction.fulfilled.type,
          payload: testFilms,
        }),
      ).toMatchObject({
        loading: false,
        error: null,
        data: testFilms,
        currentGenre: DEFAULT_GENRE,
      });
    });
    it('should add error if fetchFilmsAction rejected', () => {
      expect(
        filmsProcess.reducer(state, {
          type: fetchFilmsAction.rejected.type,
          error: { message: 'error' },
        }),
      ).toMatchObject({
        loading: false,
        error: 'error',
        data: [],
        currentGenre: DEFAULT_GENRE,
      });
    });
  });

  it('should update genre', () => {
    state.data = testFilms;
    expect(
      filmsProcess.reducer(state, {
        type: setGenre,
        payload: 'newGenre',
      }),
    ).toMatchObject({
      loading: false,
      error: null,
      data: testFilms,
      currentGenre: 'newGenre',
    });
  });
});
