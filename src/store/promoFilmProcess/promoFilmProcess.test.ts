import { PromoFilmProcess } from '../../types/state.ts';
import { fetchPromoFilmAction } from '../api-actions.ts';
import { PromoFilmType } from '../../types/film.ts';
import { promoFilmProcess } from './promoFilmProcess.ts';

const testPromoFilm: PromoFilmType = {
  id: 'testId',
  name: 'TestName',
  posterImage: 'test/posterImage',
  backgroundImage: 'test/backgroundImage',
  videoLink: 'test/videoLink',
  genre: 'testGenre',
  released: 0,
  isFavorite: true,
};

describe('promoFilmProcess', () => {
  let state: PromoFilmProcess;
  beforeEach(() => {
    state = {
      loading: false,
      error: null,
      data: null,
    };
  });

  it('should update promo film if fetchPromoFilmAction fulfilled', () => {
    expect(
      promoFilmProcess.reducer(state, {
        type: fetchPromoFilmAction.fulfilled.type,
        payload: testPromoFilm,
      }),
    ).toMatchObject({
      loading: false,
      error: null,
      data: testPromoFilm,
    });
  });
  it('should add error if fetchPromoFilmAction rejected', () => {
    expect(
      promoFilmProcess.reducer(state, {
        type: fetchPromoFilmAction.rejected.type,
        error: { message: 'error' },
      }),
    ).toMatchObject({
      loading: false,
      error: 'error',
      data: null,
    });
  });
});
