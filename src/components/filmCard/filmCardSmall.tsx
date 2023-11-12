import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';
import VideoPlayer from '../videoPlayer/videoPlayer.tsx';
import { useState } from 'react';
import { films } from '../../mocks/films.ts';
import { players } from '../../mocks/players.ts';

interface SmallFilmCardProps {
  filmId: string;
}

export const FilmCardSmall = ({ filmId }: SmallFilmCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const film = films.find(({ id }) => id === filmId);
  const player = players.find(({ id }) => id === '1');
  return film && player ? (
    <article
      className="small-film-card catalog__films-card"
      onMouseOut={() => setIsPlaying(false)}
      onMouseOver={() => setIsPlaying(true)}
    >
      <div className="small-film-card__image">
        <VideoPlayer
          imgPath={film.imgPath}
          videoPath={player.videoPath}
          isPlaying={isPlaying}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoute.Film}>
          {film.title}
        </Link>
      </h3>
    </article>
  ) : null;
};

export default FilmCardSmall;
