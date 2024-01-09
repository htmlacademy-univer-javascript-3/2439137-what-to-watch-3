import {
  getNameRating,
  getRatingCorrectEnding,
  getStarringShortList,
} from '../film-card/utils.ts';
import { FilmFullType } from '../../types/film.ts';

interface OverviewProps {
  film: FilmFullType;
}

export const Overview = ({ film }: OverviewProps) => (
  <>
    <div className="film-rating">
      <div className="film-rating__score">{film.rating.toFixed(1)}</div>
      <p className="film-rating__meta">
        <span className="film-rating__level">
          {getNameRating(film.rating.toString())}
        </span>
        <span className="film-rating__count">
          {`${film.scoresCount} ${getRatingCorrectEnding(film.scoresCount)}`}
        </span>
      </p>
    </div>

    <div className="film-card__text">
      <p>{film.description}</p>

      <p className="film-card__director">
        <strong>Director: {film.director}</strong>
      </p>

      <p className="film-card__starring">
        <strong>Starring: {getStarringShortList(film.starring)}</strong>
      </p>
    </div>
  </>
);
