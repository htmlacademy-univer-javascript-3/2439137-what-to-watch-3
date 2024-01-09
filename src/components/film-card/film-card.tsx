import { Link } from 'react-router-dom';
import { WrapHeader as Header } from '../header';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { FilmFullType } from '../../types/film.ts';
import { FavoriteAction } from '../favorite-action/favorite-action.tsx';
import { useAppSelector } from '../../hooks';
import { authorizationStatusSelector } from '../../store/user-process/selectors.ts';

export interface FullFilmCardProps {
  film: FilmFullType;
}

export const FilmCard = ({ film }: FullFilmCardProps) => {
  const authorizationStatus = useAppSelector(authorizationStatusSelector);
  return (
    <div className="film-card__hero">
      <div className="film-card__bg">
        <img src={film.backgroundImage} alt={film.name} />
      </div>

      <Header />

      <div className="film-card__wrap">
        <div className="film-card__desc">
          <h2 className="film-card__title">{film.name}</h2>
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
            {authorizationStatus === AuthorizationStatus.Auth && (
              <Link
                to={AppRoute.AddReview(film.id)}
                className="btn film-card__button"
              >
                Add review
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
