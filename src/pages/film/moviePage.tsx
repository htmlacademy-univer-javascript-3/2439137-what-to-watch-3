import FilmCardFull from '../../components/filmCard/filmCard.tsx';
import Footer from '../../components/footer/footer.tsx';
import CatalogFilms from '../../components/catalog/catalogFilms.tsx';
import Tabs from '../../components/tabs/tabs.tsx';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { useEffect } from 'react';
import LoadingScreen from '../../components/loadingScreen/loadingScreen.tsx';
import { useParams } from 'react-router-dom';
import {
  fetchCommentsFilmAction,
  fetchFilmAction,
  fetchSimilarFilmsFilmAction,
} from '../../store/api-actions.ts';
import Error from '../../components/error/error.tsx';
import {
  commentsSelector,
  filmSelector,
  loadingStatusFilmSelector,
  similarFilmsSelector,
} from '../../store/filmProcess/selectors.ts';

function MoviePage(): JSX.Element {
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
  const similarFilms = useAppSelector(similarFilmsSelector);
  const commentsFilms = useAppSelector(commentsSelector);
  if (!id) {
    return <Error />;
  }
  if (film === null || filmLoadingStatus) {
    return <LoadingScreen />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <FilmCardFull film={film} />
        <Tabs film={film} commentsFilms={commentsFilms} />
      </section>
      <div className="page-content">
        {similarFilms && (
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <CatalogFilms films={similarFilms} />
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}

export default MoviePage;
