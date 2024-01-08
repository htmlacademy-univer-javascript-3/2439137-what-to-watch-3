import Header, { HeaderType } from '../header/header.tsx';
import { fetchPromoFilmAction } from '../../store/api-actions.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import FavoriteAction from '../favoriteAction/favoriteAction.tsx';
import {
  loadingStatusPromoFilmSelector,
  promoFilmSelector,
} from '../../store/promoFilmProcess/selectors.ts';

const PromoFilmCard = () => {
  const dispatch = useAppDispatch();
  const filmPromo = useAppSelector(promoFilmSelector);
  const filmPromoLoadingStatus = useAppSelector(loadingStatusPromoFilmSelector);
  useEffect(() => {
    dispatch(fetchPromoFilmAction());
  }, [dispatch]);
  if (filmPromoLoadingStatus || !filmPromo) {
    return null;
  }
  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={filmPromo.backgroundImage} alt={filmPromo.name} />
      </div>

      <Header headerType={HeaderType.Auth} />

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={filmPromo.posterImage} alt={filmPromo.name} />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title" data-testid={'promo_film-card__title'}>{filmPromo.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{filmPromo.genre}</span>
              <span className="film-card__year">{filmPromo.released}</span>
            </p>

            <div className="film-card__buttons">
              <button className="btn btn--play film-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <FavoriteAction />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoFilmCard;
