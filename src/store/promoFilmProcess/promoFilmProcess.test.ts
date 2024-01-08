import { PromoFilmProcess } from '../../types/state.ts';
import { fetchPromoFilmAction } from '../api-actions.ts';
import { promoFilmProcess } from './promoFilmProcess.ts';
import { testPromoFilm } from '../../utils/mocks.ts';

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
