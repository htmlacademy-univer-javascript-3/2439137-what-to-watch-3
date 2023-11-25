import Main, { MainPros } from '../../pages/main/main.tsx';
import Error404 from '../error/error404.tsx';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import MoviePage from '../../pages/film/moviePage.tsx';
import SignIn from '../../pages/signIn/signIn.tsx';
import MyList from '../../pages/myList/myList.tsx';
import AddReview from '../../pages/addReview/addReview.tsx';
import Player from '../../pages/player/player.tsx';
import PrivateRoute from '../privateRoute/privateRoute.tsx';
import { FilmType } from '../../types/film.ts';
import { PlayerType } from '../../types/filmPlayer.ts';
import { ReviewsType } from '../../types/filmReview.ts';
import { useAppSelector } from '../hooks';
import LoadingScreen from '../loadingScreen/loadingScreen.tsx';
import { filmsSelectorLoadingStatue } from '../../store/selectors.ts';
import HistoryRouter from '../historyRoute/historyRoute.tsx';
import browserHistory from '../../browserHistory.ts';
import Empty from '../../pages/empty/empty.tsx';

interface AppProps {
  mainProps: MainPros;
  movieProps: FilmType[];
  playerProps: PlayerType[];
  reviewsProps: ReviewsType[];
}

function App({
  mainProps,
  movieProps,
  playerProps, // reviewsProps,
}: AppProps): JSX.Element {
  const isFilmsDataLoading = useAppSelector(filmsSelectorLoadingStatue);

  if (isFilmsDataLoading) {
    return (
      <Empty>
        <LoadingScreen />
      </Empty>
    );
  }
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<Main {...mainProps} />} />
        <Route path={AppRoute.SignIn} element={<SignIn />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <MyList />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Film}
          element={<MoviePage film={movieProps[0]} />}
        />
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <AddReview film={movieProps[0]} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Player}
          element={<Player player={playerProps[0]} />}
        />
        <Route
          path={AppRoute.Error}
          element={
            <Empty>
              <Error404 />
            </Empty>
          }
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
