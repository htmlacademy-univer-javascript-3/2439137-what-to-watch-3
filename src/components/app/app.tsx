import Main, { MainPros } from '../../pages/main/main.tsx';
import Error404 from '../../pages/error/error404.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import MoviePage from '../../pages/film/moviePage.tsx';
import SignIn from '../../pages/signIn/signIn.tsx';
import MyList from '../../pages/myList/myList.tsx';
import AddReview from '../../pages/addReview/addReview.tsx';
import Player from '../../pages/player/player.tsx';
import PrivateRoute from '../privateRoute/privateRoute.tsx';
import { FilmType } from '../../types/film.ts';
import { PlayerType } from '../../types/filmPlayer.ts';
import { ReviewType } from '../../types/filmReview.ts';

interface AppProps {
  mainProps: MainPros;
  movieProps: FilmType[];
  playerProps: PlayerType[];
  reviewProps: ReviewType[];
}

function App({
  mainProps,
  movieProps,
  playerProps,
  // reviewProps,
}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
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
          element={<MoviePage film={movieProps[0]} /*reviews={reviewProps[0]} *//>}
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
        <Route path={AppRoute.Error} element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
