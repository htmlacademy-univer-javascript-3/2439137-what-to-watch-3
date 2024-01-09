import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AppRoute } from '../../const.ts';
import { VideoPlayer } from '../video-player/video-player.tsx';
import { FilmType } from '../../types/film.ts';

interface SmallFilmCardProps {
  film: FilmType;
}

export const FilmCardSmall = ({ film }: SmallFilmCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <Link
      className="small-film-card catalog__films-card small-film-card__link"
      onMouseOut={() => setIsPlaying(false)}
      onMouseOver={() => setIsPlaying(true)}
      to={AppRoute.Film(film.id)}
    >
      <div className="small-film-card__image">
        <VideoPlayer
          imgPath={film.previewImage}
          videoPath={film.previewVideoLink}
          isPlaying={isPlaying}
        />
      </div>
      <h3 className="small-film-card__title">
        <p className="small-film-card__link" style={{ margin: 0 }}>
          {film.name}
        </p>
      </h3>
    </Link>
  );
};
