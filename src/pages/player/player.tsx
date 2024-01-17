import { useNavigate } from 'react-router-dom';
import { FilmFullType } from '../../types/film.ts';
import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { formatRunTimeLeft } from '../../components/film-card/utils.ts';

export interface PlayerPros {
  film: FilmFullType;
}

const PROGRESS_PADDING = 25;

export const EntityPlayer = ({ film }: PlayerPros) => {
  const navigate = useNavigate();
  const [progressTime, setProgressTime] = useState<number>(0);
  const [progressBarTime, setProgressBarTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoTime = useMemo(
    () => videoRef?.current?.duration || 0,
    [videoRef.current, videoRef?.current?.duration],
  );
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play().then();
    } else {
      videoRef.current?.pause();
    }
  }, [isPlaying]);

  const handleFullscreenModeEnter = () => {
    const video = videoRef.current;

    if (video) {
      video.requestFullscreen().then();
    }
  };

  const setTimeProgressPrayer = () => {
    const video = videoRef.current;

    if (video) {
      const currentTime = video.currentTime;

      if (progressTime !== currentTime) {
        setProgressTime(currentTime);
        setProgressBarTime((currentTime * 100) / videoTime);
      }
    }
  };

  const setTimeProgressBar = (event: MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    const progressBar = progressBarRef.current;

    if (video && progressBar) {
      const currentTimeLength = event.clientX - PROGRESS_PADDING;
      const currentTime =
        videoTime * (currentTimeLength / progressBar.clientWidth);
      video.currentTime = currentTime;
      setProgressTime(currentTime);
      setProgressBarTime((currentTime * 100) / videoTime);
    }
  };

  return (
    <div className="player">
      <video
        ref={videoRef}
        src={film.videoLink}
        className="player__video"
        poster={film.posterImage}
        preload={'auto'}
        onTimeUpdate={setTimeProgressPrayer}
        onClick={() => setIsPlaying((prev) => !prev)}
      />

      <button
        type="button"
        className="player__exit"
        onClick={() => navigate(-1)}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div
            ref={progressBarRef}
            className="player__time"
            onClick={(event) => setTimeProgressBar(event)}
            style={{padding: '16px 0'}}
          >
            <progress
              className="player__progress"
              value={`${progressBarTime}`}
              max="100"
            />
            <div
              className="player__toggler"
              style={{ left: `${progressBarTime}%` }}
            >
              Toggler
            </div>
          </div>
          <div className="player__time-value">
            {formatRunTimeLeft(Math.floor(videoTime - progressTime))}
          </div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={() => setIsPlaying((prev) => !prev)}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPlaying ? '#pause' : '#play-s'} />
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name" data-testid={'player__name'}>
            {film.name}
          </div>

          <button
            type="button"
            className="player__full-screen"
            onClick={handleFullscreenModeEnter}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
