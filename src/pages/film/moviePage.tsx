import FilmCardFull from '../../components/filmCard/filmCardFull.tsx';
import Footer from '../../components/footer/footer.tsx';
import CatalogFilms from '../../components/catalog/catalogFilms.tsx';
import Tabs from '../../components/tabs/tabs.tsx';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import {
  commentsFilmSelector,
  filmLoadingStatusSelector,
  filmSelector,
  similarFilmsSelector,
} from '../../store/selectors.ts';
import Empty from '../empty/empty.tsx';
import { useEffect } from 'react';
import LoadingScreen from '../../components/loadingScreen/loadingScreen.tsx';
import { useLocation } from 'react-router-dom';
import {fetchCommentFilmAction, fetchFilmAction, fetchSimilarFilmsAction} from '../../store/api-actions.ts';

function MoviePage(): JSX.Element {
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
  const similarFilms = useAppSelector(similarFilmsSelector);
  const commentsFilms = useAppSelector(commentsFilmSelector);

  if (film === null || filmLoadingStatus) {
    return (
      <Empty>
        <LoadingScreen />
      </Empty>
    );
  }

  return (
    <>
      <section className="film-card film-card--full">
        <FilmCardFull film={film} />
        <Tabs film={film} commentsFilms={commentsFilms}/>
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
