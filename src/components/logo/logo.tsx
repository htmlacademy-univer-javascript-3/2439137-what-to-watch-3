import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';

interface LogoProps {
  isLight: boolean;
}

export const Logo = ({ isLight }: LogoProps) => (
  <div className="logo">
    <Link
      className={`logo__link ${isLight ? 'logo__link--light' : ''}`}
      to={AppRoute.Main}
    >
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </Link>
  </div>
);

export default Logo;
