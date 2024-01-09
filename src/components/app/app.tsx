import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { Main } from '../../pages/main/main.tsx';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { SignIn } from '../../pages/sign-in/sign-in.tsx';
import { MyList } from '../../pages/my-list/my-list.tsx';
import { PrivateRoute } from '../private-route/private-route.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { MoviePage } from '../../pages/film/movie-page.tsx';
import { AddReview } from '../../pages/add-review/add-review.tsx';
import { Player } from '../../pages/player';
import { Error } from '../error/error.tsx';
import { authorizationStatusSelector } from '../../store/user-process/selectors.ts';
import { fetchFavoriteFilmsAction } from '../../store/api-actions.ts';

export function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(authorizationStatusSelector);
  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [authorizationStatus, dispatch]);
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />} />
        <Route path={AppRoute.SignIn} element={<SignIn />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute>
              <MyList />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Film(':id')} element={<MoviePage />} />
        <Route
          path={AppRoute.AddReview(':id')}
          element={
            <PrivateRoute>
              <AddReview />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Player(':id')} element={<Player />} />
        <Route path={AppRoute.Error} element={<Error />} />
      </Routes>
    </HelmetProvider>
  );
}
