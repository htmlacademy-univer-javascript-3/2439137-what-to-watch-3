import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  imgPath: string;
  videoPath: string;
  isPlaying: boolean;
}

function VideoPlayer({
  imgPath,
  videoPath,
  isPlaying,
}: VideoPlayerProps): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
    <video
      poster={imgPath}
      src={videoPath}
      ref={videoRef}
      muted
      style={{ width: 'inherit', height: 'inherit' }}
    />
  );
}

export default VideoPlayer;
