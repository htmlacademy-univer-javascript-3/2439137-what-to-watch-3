import {
  getNameRating,
  ratingSelector,
  starringToStringRow,
} from '../filmCard/utils.ts';
import { FilmFullType } from '../../types/film.ts';

interface OverviewProps {
  film: FilmFullType;
}

const Overview = ({ film }: OverviewProps) => (
  <>
    <div className="film-rating">
      <div className="film-rating__score">{film.rating}</div>
      <p className="film-rating__meta">
        <span className="film-rating__level">
          {getNameRating(film.rating.toString())}
        </span>
        <span className="film-rating__count">
          {`${film.scoresCount} ${ratingSelector(film.scoresCount)}`}
        </span>
      </p>
    </div>

    <div className="film-card__text">
      <p>{film.description}</p>

      <p className="film-card__director">
        <strong>Director: {film.director}</strong>
      </p>

      <p className="film-card__starring">
        <strong>Starring: {starringToStringRow(film.starring)}</strong>
      </p>
    </div>
  </>
);

export default Overview;
