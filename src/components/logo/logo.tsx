import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';
import { resetCatalog } from '../../store/action.ts';
import { useAppDispatch } from '../hooks';

interface LogoProps {
  isLight: boolean;
}

export const Logo = ({ isLight }: LogoProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="logo">
      <Link
        className={`logo__link ${isLight ? 'logo__link--light' : ''}`}
        to={AppRoute.Main}
        onClick={() => dispatch(resetCatalog())}
      >
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
};

export default Logo;
