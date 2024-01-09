import { Link } from 'react-router-dom';
import { Empty } from '../../pages/empty/empty-block.tsx';
import { AppRoute } from '../../const.ts';

export function ErrorBlock({ message }: { message: string }): JSX.Element {
  return (
    <Empty>
      <div>
        <p className="error__emoji">(⊙_⊙)</p>
        <p className="error__text">
          {message}
          {'. '}
          <Link className="error__link" to={AppRoute.Main}>
            Перезагрузите страницу.
          </Link>
        </p>
      </div>
    </Empty>
  );
}
