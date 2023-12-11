import Logo from '../logo/logo.tsx';
import {memo, ReactNode} from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';

export const HeaderType = {
  Error: 'error',
  MyList: 'myList',
  Auth: 'auth',
  NoAuth: 'noAuth',
};

interface propTypes {
  children?: ReactNode;
  headerType: string;
}

export const Header = ({
  children,
  headerType = HeaderType.Auth,
}: propTypes) => (
  <>
    {headerType === HeaderType.Auth && <h1 className="visually-hidden">WTW</h1>}
    <header
      className={`page-header ${
        headerType === HeaderType.Auth ? 'film-card__head' : 'user-page__head'
      }`}
    >
      <Logo isLight={false} />
      {children}
      {headerType === HeaderType.Auth && (
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img
                src="img/avatar.jpg"
                alt="User avatar"
                width="63"
                height="63"
              />
            </div>
          </li>
          <li className="user-block__item">
            <Link className="user-block__link" to={AppRoute.SignIn}>
              Sign out
            </Link>
          </li>
        </ul>
      )}
      {headerType === HeaderType.NoAuth && (
        <h1 className="page-title user-page__title">Sign in</h1>
      )}
    </header>
  </>
);

export default memo(Header);
