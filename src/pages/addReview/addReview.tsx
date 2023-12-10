import FilmCardReview from '../../components/filmCard/filmCardReview.tsx';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { useEffect } from 'react';
import {
  fetchCommentsFilmAction,
  fetchFilmAction,
  fetchSimilarFilmsAction,
} from '../../store/api-actions.ts';
import {
  filmLoadingStatusSelector,
  filmSelector,
} from '../../store/selectors.ts';
import LoadingScreen from '../../components/loadingScreen/loadingScreen.tsx';
import Error from '../../components/error/error.tsx';

function AddReview(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction({ filmId: id }));
      dispatch(fetchCommentsFilmAction({ filmId: id }));
      dispatch(fetchSimilarFilmsAction({ filmId: id }));
    }
  }, [dispatch, id]);
  const film = useAppSelector(filmSelector);
  const filmLoadingStatus = useAppSelector(filmLoadingStatusSelector);
  if (!id) {
    return <Error />;
  }
  if (film === null || filmLoadingStatus) {
    return <LoadingScreen />;
  }
  return <FilmCardReview film={film} />;
}

export default AddReview;
