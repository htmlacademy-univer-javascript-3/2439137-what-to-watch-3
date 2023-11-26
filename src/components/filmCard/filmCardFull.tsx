import Header, { HeaderType } from '../header/header.tsx';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { Link } from 'react-router-dom';
import { FilmFullType } from '../../types/film.ts';
import ButtonMyLists from '../buttonMyLists/buttonMyLists.tsx';
import { useAppSelector } from '../hooks';
import { authorizationStatusSelector } from '../../store/selectors.ts';

interface FullFilmCardProps {
  film: FilmFullType;
}

const FilmCardFull = ({ film }: FullFilmCardProps) => {
  const authorizationStatus = useAppSelector(authorizationStatusSelector).data;
  return (
    <div className="film-card__hero">
      <div className="film-card__bg">
        <img src={film.backgroundImage} alt={film.name} />
      </div>

      <Header headerType={HeaderType.Auth} />

      <div className="film-card__wrap">
        <div className="film-card__desc">
          <h2 className="film-card__title">{film.name}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{film.genre}</span>
            <span className="film-card__year">{film.released}</span>
          </p>

          <div className="film-card__buttons">
            <button className="btn btn--play film-card__button" type="button">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <ButtonMyLists />
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

export default FilmCardFull;
