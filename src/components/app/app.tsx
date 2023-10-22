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

function App(pros: MainPros): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main {...pros} />} />
        <Route path={AppRoute.SignIn} element={<SignIn />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyList />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film} element={<MoviePage {...pros} />} />
        <Route path={AppRoute.AddReview} element={<AddReview {...pros} />} />
        <Route path={AppRoute.Player} element={<Player />} />
        <Route path={AppRoute.Error} element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
