import { FilmCardProps } from './filmCard.tsx';

export const FilmCardSmall = ({ film }: FilmCardProps) => (
  <article className="small-film-card catalog__films-card">
    <div className="small-film-card__image">
      <img src={film.imgPath} alt={film.title} />
    </div>
    <h3 className="small-film-card__title">
      <a className="small-film-card__link" href="film-page.html">
        {film.title}
      </a>
    </h3>
  </article>
);

export default FilmCardSmall;
