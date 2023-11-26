import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';
import VideoPlayer from '../videoPlayer/videoPlayer.tsx';
import { useState } from 'react';
import { FilmType } from '../../types/film.ts';

interface SmallFilmCardProps {
  film: FilmType;
}

export const FilmCardSmall = ({ film }: SmallFilmCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return film ? (
    <article
      className="small-film-card catalog__films-card"
      onMouseOut={() => setIsPlaying(false)}
      onMouseOver={() => setIsPlaying(true)}
    >
      <div className="small-film-card__image">
        <VideoPlayer
          imgPath={film.previewImage}
          videoPath={film.previewVideoLink}
          isPlaying={isPlaying}
        />
      </div>
      <h3
        className="small-film-card__title"
      >
        <Link className="small-film-card__link" to={AppRoute.Film(film.id)}>
          {film.name}
        </Link>
      </h3>
    </article>
  ) : null;
};

export default FilmCardSmall;
