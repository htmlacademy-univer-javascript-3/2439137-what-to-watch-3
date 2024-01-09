import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { HeaderType } from './header.tsx';
import { AuthHeader } from './auth-header.tsx';

export const getClassHeader = (headerType: string, auth: string) => {
  switch (headerType) {
    case HeaderType.SignIn:
    case HeaderType.MyList:
      return 'user-page__head';
    case HeaderType.Main: {
      if (auth === AuthorizationStatus.Auth) {
        return 'film-card__head';
      }
      return '';
    }
    default:
      return '';
  }
};

export const getContentHeader = (headerType: string, auth: string) => {
  switch (headerType) {
    case HeaderType.SignIn:
    case HeaderType.Empty:
      return null;
    case HeaderType.MyList:
    case HeaderType.AddReview:
      return <AuthHeader />;
    case HeaderType.Main: {
      if (auth === AuthorizationStatus.Auth) {
        return <AuthHeader />;
      }
      return (
        <ul className="user-block">
          <li className="user-block__item">
            <Link className="user-block__link" to={AppRoute.SignIn}>
              Sign in
            </Link>
          </li>
        </ul>
      );
    }
    default:
      return (
        <ul className="user-block">
          <li className="user-block__item">
            <Link className="user-block__link" to={AppRoute.SignIn}>
              Sign in
            </Link>
          </li>
        </ul>
      );
  }
};
