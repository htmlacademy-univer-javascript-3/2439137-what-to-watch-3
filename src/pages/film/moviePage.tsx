import { FilmCardWrap as FilmCardFull } from '../../components/filmCard/filmCard.index.tsx';
import Footer from '../../components/footer/footer.tsx';
import CatalogFilms from '../../components/catalog/catalogFilms.tsx';
import Tabs from '../../components/tabs/tabs.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect, useMemo } from 'react';
import LoadingScreen from '../../components/loadingScreen/loadingScreen.tsx';
import { useParams } from 'react-router-dom';
import {
  fetchCommentsFilmAction,
  fetchFilmAction,
  fetchSimilarFilmsFilmAction,
} from '../../store/api-actions.ts';
import {
  commentsSelector,
  errorCommentsSelector,
  errorFilmSelector,
  filmSelector,
  loadingStatusCommentsSelector,
  loadingStatusFilmSelector,
  similarFilmsSelector,
} from '../../store/filmProcess/selectors.ts';
import Error from '../../components/error/error.tsx';
import { clear } from '../../store/filmProcess/filmProcess.ts';
import { MAX_SIMILAR_FILMS_AMOUNT } from '../../components/catalog/utils.ts';
import ErrorBlock from '../../components/error/errorBlock.tsx';

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
  const filmError = useAppSelector(errorFilmSelector);
  const filmLoadingStatus = useAppSelector(loadingStatusFilmSelector);
  const similarFilms = useAppSelector(similarFilmsSelector);
  const commentsFilms = useAppSelector(commentsSelector);
  const commentsFilmsError = useAppSelector(errorCommentsSelector);
  const commentsFilmsLoadingStatus = useAppSelector(
    loadingStatusCommentsSelector,
  );
  const catalogFilms = useMemo(
    () => similarFilms.slice(0, MAX_SIMILAR_FILMS_AMOUNT),
    [similarFilms],
  );

  useEffect(
    () => () => {
      dispatch(clear());
    },
    [dispatch],
  );

  if (filmError) {
    return <ErrorBlock message={filmError} />;
  }
  if (!id || filmError) {
    return <Error />;
  }
  if (film === null || filmLoadingStatus) {
    return <LoadingScreen />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <FilmCardFull film={film} />
        <Tabs
          film={film}
          commentsFilms={commentsFilms}
          commentsFilmsError={commentsFilmsError}
          commentsFilmsLoadingStatus={commentsFilmsLoadingStatus}
        />
      </section>
      <div className="page-content">
        {catalogFilms.length !== 0 && (
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <CatalogFilms films={catalogFilms} />
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}

export default MoviePage;
