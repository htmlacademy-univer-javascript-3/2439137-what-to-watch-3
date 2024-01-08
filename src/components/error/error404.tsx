import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';

function Error404(): JSX.Element {
  return (
    <div >
      <p className="error__emoji">(⊙_⊙)</p>
      <p className="error__number">404</p>
      <p className="error__text">
        Ты как сюда попал.{' '}
        <Link className="error__link" to={AppRoute.Main}>
          Уходи.
        </Link>
      </p>
    </div>
  );
}

export default Error404;
