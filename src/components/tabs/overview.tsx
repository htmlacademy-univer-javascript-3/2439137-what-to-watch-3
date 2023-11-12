import {
  getNameRating,
  ratingSelector,
  starringToStringRow,
} from '../filmCard/utils.ts';
import { FilmType } from '../../types/film.ts';

interface OverviewProps {
  film: FilmType;
}

const Overview = ({ film }: OverviewProps) => (
  <>
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
          <strong>Starring: {starringToStringRow(film.starring)}</strong>
        </p>
      )}
    </div>
  </>
);

export default Overview;
