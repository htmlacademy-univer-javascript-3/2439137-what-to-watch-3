import FilmCardReview from '../../components/filmCard/filmCardReview.tsx';
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

function AddReview(): JSX.Element {
  const location = useLocation();
  const filmId = location.pathname.replace('/films/', '').replace('/review', '');
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
  return <FilmCardReview film={film}/>;
}

export default AddReview;
