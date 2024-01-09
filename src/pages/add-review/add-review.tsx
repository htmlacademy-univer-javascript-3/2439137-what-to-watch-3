import { FilmCardReview } from '../../components/film-card/film-card-review.tsx';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import {
  fetchCommentsFilmAction,
  fetchFilmAction,
  fetchSimilarFilmsFilmAction,
} from '../../store/api-actions.ts';
import { LoadingScreen } from '../../components/loading-screen/loading-screen.tsx';
import { Error } from '../../components/error/error.tsx';
import {
  filmSelector,
  loadingStatusFilmSelector,
} from '../../store/film-process/selectors.ts';

export function AddReview(): JSX.Element {
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
  if (filmLoadingStatus) {
    return <LoadingScreen />;
  }
  if (!film) {
    return <Error />;
  }
  return <FilmCardReview film={film} />;
}
