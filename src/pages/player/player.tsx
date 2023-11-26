import { PlayerType } from '../../types/filmPlayer.ts';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { useEffect } from 'react';
import {
  fetchCommentFilmAction,
  fetchFilmAction,
  fetchSimilarFilmsAction,
} from '../../store/api-actions.ts';
import {
  filmLoadingStatusSelector,
  filmSelector,
} from '../../store/selectors.ts';
import Empty from '../empty/empty.tsx';
import LoadingScreen from '../../components/loadingScreen/loadingScreen.tsx';

export interface PlayerPros {
  player: PlayerType;
}

function Player(): JSX.Element {
  const location = useLocation();
  const filmId = location.pathname.replace('/films/', '');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFilmAction({ filmId }));
    dispatch(fetchCommentFilmAction({ filmId }));
    dispatch(fetchSimilarFilmsAction({ filmId }));
  }, [dispatch, filmId]);
  const film = useAppSelector(filmSelector);
  const filmLoadingStatus = useAppSelector(filmLoadingStatusSelector);
  if (film === null || filmLoadingStatus) {
    return (
      <Empty>
        <LoadingScreen />
      </Empty>
    );
  }
  return (
    <div className="player">
      <video
        src="#"
        className="player__video"
        poster={film.posterImage}
      >
      </video>

      <button type="button" className="player__exit">
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value="30"
              max="100"
            >
            </progress>
            <div className="player__toggler" style={{ left: '30%' }}>
              Toggler
            </div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Player;
