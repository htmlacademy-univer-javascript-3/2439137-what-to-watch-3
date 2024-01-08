import FilmCardReview from '../../components/filmCard/filmCardReview.tsx';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import {
  fetchCommentsFilmAction,
  fetchFilmAction,
  fetchSimilarFilmsFilmAction,
} from '../../store/api-actions.ts';
import LoadingScreen from '../../components/loadingScreen/loadingScreen.tsx';
import Error from '../../components/error/error.tsx';
import {
  filmSelector,
  loadingStatusFilmSelector,
} from '../../store/filmProcess/selectors.ts';

function AddReview(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction({ filmId: id }));
      dispatch(fetchCommentsFilmAction({ filmId: id }));
      dispatch(fetchSimilarFilmsFilmAction({ filmId: id }));
    }
  }, [dispatch, id]);
  const film = useAppSelector(filmSelector);
  const filmLoadingStatus = useAppSelector(loadingStatusFilmSelector);
  if (!id) {
    return <Error />;
  }
  if (film === null || filmLoadingStatus) {
    return <LoadingScreen />;
  }
  return <FilmCardReview film={film} />;
}

export default AddReview;
