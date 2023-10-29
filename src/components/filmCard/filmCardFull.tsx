import Header, { HeaderType } from '../header/header.tsx';
import {
  getNameRating,
  ratingSelector,
  starringToString,
} from './filmCardFunctions.ts';
import { AppRoute, filmNav } from '../../const.ts';
import { Link } from 'react-router-dom';
import { FilmType } from '../../types/film.ts';
/*
import { ReviewType } from '../../types/filmReview.ts';
*/

interface FullFilmCardProps {
  film: FilmType;
/*
  reviews: ReviewType;
*/
}

const FilmCardFull = ({ film, /*reviews*/ }: FullFilmCardProps) => (
  <section className="film-card film-card--full">
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

    <div className="film-card__wrap film-card__translate-top">
      <div className="film-card__info">
        <div className="film-card__poster film-card__poster--big">
          <img src={film.imgPath} alt={film.title} width="218" height="327" />
        </div>

        <div className="film-card__desc">
          <nav className="film-nav film-card__nav">
            <ul className="film-nav__list">
              {filmNav.map((nav) => (
                <li
                  key={`key_${nav.title}`}
                  className={`film-nav__item ${
                    nav.isActive ? 'film-nav__item--active' : ''
                  }`}
                >
                  <a href={nav.href} className="film-nav__link">
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="film-rating">
            <div className="film-rating__score">
              {film.rating ? film.rating[0] : '0'}
            </div>
            <p className="film-rating__meta">
              <span className="film-rating__level">
                {getNameRating(film.rating ? film.rating[0] : '0')}
              </span>
              <span className="film-rating__count">
                {`${film.rating ? film.rating[1] : 0} ${ratingSelector(
                  film.rating ? film.rating[1] : 0,
                )}`}
              </span>
            </p>
          </div>

          <div className="film-card__text">
            {film.annotation?.map((annotationItem, index) => (
              <p key={`key_${film.title}_annotation_${index + 1}`}>
                {annotationItem}
              </p>
            ))}

            {film.director && (
              <p className="film-card__director">
                <strong>Director: {film.director}</strong>
              </p>
            )}

            {film.starring && (
              <p className="film-card__starring">
                <strong>Starring: {starringToString(film.starring)}</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FilmCardFull;
