import Logo from '../logo/logo.tsx';
import { ReactNode } from 'react';

interface propTypes {
  children?: ReactNode;
  authorized?: boolean;
}

export const Header = ({ children, authorized = true }: propTypes) => (
  <>
    {!children && authorized && <h1 className="visually-hidden">WTW</h1>}
    <header
      className={`page-header ${
        children || !authorized ? 'user-page__head' : 'film-card__head'
      }`}
    >
      <Logo isLight={false} />
      {children}
      {authorized ? (
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
            <a className="user-block__link">Sign out</a>
          </li>
        </ul>
      ) : (
        <h1 className="page-title user-page__title">Sign in</h1>
      )}
    </header>
  </>
);

export default Header;
