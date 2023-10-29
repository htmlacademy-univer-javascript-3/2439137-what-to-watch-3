import { useEffect, useRef, useState } from 'react';
import { films } from '../../mocks/films.ts';
import { players } from '../../mocks/players.ts';

interface VideoPlayerProps {
  filmId: string;
  isPlaying: boolean;
}

function VideoPlayer({ filmId, isPlaying }: VideoPlayerProps): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const film = films.filter(({ id }) => id === filmId)[0];
  const player = players.filter(({ id }) => id === '1')[0];

  const handleDataLoaded = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    const playerElement = videoRef.current;

    if (!playerElement) {
      return;
    }

    playerElement.addEventListener('loadeddata', handleDataLoaded);

    return () => {
      playerElement.removeEventListener('loadeddata', handleDataLoaded);
    };
  }, []);

  useEffect(() => {
    const playerElement = videoRef.current;
    if (!playerElement || !isLoaded) {
      return;
    }

    const timerId = setTimeout(() => {
      if (isPlaying && playerElement.paused) {
        playerElement.play();
      }
    }, 1000);

    if (!isPlaying && playerElement.played) {
      playerElement.load();
    }
    return () => clearTimeout(timerId);
  }, [isLoaded, isPlaying]);

  return (
    film &&
    player && (
      <video
        poster={film.imgPath}
        src={player.videoPath}
        ref={videoRef}
        muted
        style={{ width: 'inherit', height: 'inherit' }}
      />
    )
  );
}

export default VideoPlayer;
