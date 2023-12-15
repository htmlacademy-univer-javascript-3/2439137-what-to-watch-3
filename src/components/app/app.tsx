import Main from '../../pages/main/main.tsx';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import SignIn from '../../pages/signIn/signIn.tsx';
import MyList from '../../pages/myList/myList.tsx';
import PrivateRoute from '../privateRoute/privateRoute.tsx';
import HistoryRouter from '../historyRoute/historyRoute.tsx';
import browserHistory from '../../browserHistory.ts';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useEffect } from 'react';
import MoviePage from '../../pages/film/moviePage.tsx';
import AddReview from '../../pages/addReview/addReview.tsx';
import Player from '../../pages/player';
import Error from '../error/error.tsx';
import { authorizationStatusSelector } from '../../store/userProcess/selectors.ts';
import { fetchFavoriteFilmsAction } from '../../store/api-actions.ts';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(authorizationStatusSelector);
  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [authorizationStatus, dispatch]);
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
        <Route path={AppRoute.Error} element={<Error />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
