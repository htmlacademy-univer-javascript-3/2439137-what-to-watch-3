import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';

export function Error404({ message }: { message?: string }): JSX.Element {
  return (
    <div >
      <p className="error__emoji">(⊙_⊙)</p>
      <p className="error__number">404</p>
      <p className="error__text">
        {message || 'Ты как сюда попал.'}{' '}
        <Link className="error__link" to={AppRoute.Main}>
          Уходи.
        </Link>
      </p>
    </div>
  );
}
