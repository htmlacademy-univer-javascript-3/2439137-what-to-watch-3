import Header, { HeaderType } from '../header/header.tsx';
import { AppRoute } from '../../const.ts';
import { Link } from 'react-router-dom';
import { FilmType } from '../../types/film.ts';

interface FullFilmCardProps {
  film: FilmType;
}

const FilmCardFull = ({ film /*reviews*/ }: FullFilmCardProps) => (
  <div className="film-card__hero">
    <div className="film-card__bg">
      <img src={film.backgroundImgPath} alt={film.title} />
    </div>

    <Header headerType={HeaderType.Auth} />

    <div className="film-card__wrap">
      <div className="film-card__desc">
        <h2 className="film-card__title">{film.title}</h2>
        <p className="film-card__meta">
          <span className="film-card__genre">{film.genre}</span>
          <span className="film-card__year">{film.releaseDate}</span>
        </p>

        <div className="film-card__buttons">
          <button className="btn btn--play film-card__button" type="button">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <button className="btn btn--list film-card__button" type="button">
            <svg viewBox="0 0 19 20" width="19" height="20">
              <use xlinkHref="#add"></use>
            </svg>
            <span>My list</span>
            <span className="film-card__count">9</span>
          </button>
          <Link to={AppRoute.AddReview} className="btn film-card__button">
            Add review
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default FilmCardFull;
