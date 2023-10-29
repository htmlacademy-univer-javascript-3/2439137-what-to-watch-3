import { FilmType } from '../../types/film.ts';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';

interface SmallFilmCardProps {
  film: FilmType;
  onMouseOut: () => void;
  onMouseOver: () => void;
}

export const FilmCardSmall = ({
  film,
  onMouseOut,
  onMouseOver,
}: SmallFilmCardProps) => (
  <article
    className="small-film-card catalog__films-card"
    onMouseOut={onMouseOut}
    onMouseOver={onMouseOver}
  >
    <div className="small-film-card__image">
      <img src={film.imgPath} alt={film.title} />
    </div>
    <h3 className="small-film-card__title">
      <Link className="small-film-card__link" to={AppRoute.Film}>
        {film.title}
      </Link>
    </h3>
  </article>
);

export default FilmCardSmall;
