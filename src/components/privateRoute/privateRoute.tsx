import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { useAppSelector } from '../../hooks';
import { authorizationStatusSelector } from '../../store/userProcess/selectors.ts';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children } = props;
  const authorizationStatus = useAppSelector(authorizationStatusSelector);

  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoute;
