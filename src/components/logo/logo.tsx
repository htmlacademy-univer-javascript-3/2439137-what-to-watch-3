import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';
import { useAppSelector } from '../../hooks';
import { loadingStatusFilmsSelector } from '../../store/films-process/selectors.ts';

interface LogoProps {
  isLight: boolean;
}

export const Logo = ({ isLight }: LogoProps) => {
  const filmsLoadingStatus = useAppSelector(loadingStatusFilmsSelector);
  if (filmsLoadingStatus) {
    return (
      <div className="logo">
        <span className={`logo__link ${isLight ? 'logo__link--light' : ''}`}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </span>
      </div>
    );
  }
  return (
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
};
