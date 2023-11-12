import { FilmType } from '../../types/film.ts';
import {runTimeSelector, starringToStringColumn} from '../filmCard/utils.ts';

interface OverviewProps {
  film: FilmType;
}

const Details = ({ film }: OverviewProps) => (
  <div className="film-card__text film-card__row">
    <div className="film-card__text-col">
      {film.director && (
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{film.director}</span>
        </p>
      )}
      {film.starring && (
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {starringToStringColumn(film.starring)}
          </span>
        </p>
      )}
    </div>

    <div className="film-card__text-col">
      {film.runTime && (
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">
            {runTimeSelector(film.runTime)}
          </span>
        </p>
      )}
      {film.genre && (
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{film.genre}</span>
        </p>
      )}
      {film.releaseDate && (
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{film.releaseDate}</span>
        </p>
      )}
    </div>
  </div>
);

export default Details;
