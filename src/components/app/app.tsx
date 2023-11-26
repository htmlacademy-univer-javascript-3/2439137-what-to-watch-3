import Main from '../../pages/main/main.tsx';
import Error404 from '../error/error404.tsx';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import SignIn from '../../pages/signIn/signIn.tsx';
import MyList from '../../pages/myList/myList.tsx';
import PrivateRoute from '../privateRoute/privateRoute.tsx';
import HistoryRouter from '../historyRoute/historyRoute.tsx';
import browserHistory from '../../browserHistory.ts';
import Empty from '../../pages/empty/empty.tsx';
import { useAppDispatch, useAppSelector } from '../hooks';
import { authorizationStatusSelector } from '../../store/selectors.ts';
import { useEffect } from 'react';
import { fetchFilmsFavoriteAction } from '../../store/api-actions.ts';
import MoviePage from '../../pages/film/moviePage.tsx';
import AddReview from '../../pages/addReview/addReview.tsx';
import Player from '../../pages/player/player.tsx';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(authorizationStatusSelector).data;
  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFilmsFavoriteAction());
    }
  });
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />} />
        <Route path={AppRoute.SignIn} element={<SignIn />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <MyList />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film(':id')} element={<MoviePage />} />
        <Route
          path={AppRoute.AddReview(':id')}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <AddReview />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Player(':id')} element={<Player />} />
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
