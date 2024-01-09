import { HeaderWrap as Header } from '../header';
import { useAppSelector } from '../../hooks';
import FavoriteAction from '../favoriteAction/favoriteAction.tsx';
import { authorizationStatusSelector } from '../../store/userProcess/selectors.ts';
import { FilmFullType, PromoFilmType } from '../../types/film.ts';
import { AppRoute } from '../../const.ts';
import { Link } from 'react-router-dom';

export interface FullFilmCardProps {
  film: FilmFullType | PromoFilmType;
}

const PromoFilmCard = ({ film }: FullFilmCardProps) => {
  const authorizationStatus = useAppSelector(authorizationStatusSelector);

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={film.backgroundImage} alt={film.name} />
      </div>

      <Header />

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={film.posterImage} alt={film.name} />
          </div>

          <div className="film-card__desc">
            <h2
              className="film-card__title"
              data-testid={'promo_film-card__title'}
            >
              {film.name}
            </h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{film.genre}</span>
              <span className="film-card__year">{film.released}</span>
            </p>

            <div className="film-card__buttons">
              <Link
                className="btn btn--play film-card__button"
                to={AppRoute.Player(film.id)}
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                Play
              </Link>
              <FavoriteAction
                authorizationStatus={authorizationStatus}
                film={film}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoFilmCard;
