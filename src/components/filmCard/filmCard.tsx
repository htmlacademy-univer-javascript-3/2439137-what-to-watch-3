import Header, { HeaderType } from '../header/header.tsx';
import { fetchFilmPromoAction } from '../../store/api-actions.ts';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  filmPromoLoadingStatusSelector,
  filmPromoSelector,
} from '../../store/selectors.ts';
import { useEffect } from 'react';
import ButtonMyLists from '../buttonMyLists/buttonMyLists.tsx';

const FilmCard = () => {
  const dispatch = useAppDispatch();
  const filmPromo = useAppSelector(filmPromoSelector);
  const filmPromoLoadingStatus = useAppSelector(filmPromoLoadingStatusSelector);
  useEffect(() => {
    dispatch(fetchFilmPromoAction());
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
            <h2 className="film-card__title">{filmPromo.name}</h2>
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
              <ButtonMyLists />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilmCard;
