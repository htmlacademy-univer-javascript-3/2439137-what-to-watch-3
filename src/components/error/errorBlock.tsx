import EmptyBlock from '../../pages/empty/emptyBlock.tsx';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';

function ErrorBlock({ message }: { message: string }): JSX.Element {
  return (
    <EmptyBlock>
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
    </EmptyBlock>
  );
}

export default ErrorBlock;
