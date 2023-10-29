import Header, { HeaderType } from '../../components/header/header.tsx';
import Footer from '../../components/footer/footer.tsx';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';

function Error404(): JSX.Element {
  return (
    <div className="error">
      <Header headerType={HeaderType.Error} />
      <p className="error__emoji">(⊙_⊙)</p>
      <p className="error__number">404</p>
      <p className="error__text">
        Ты как сюда попал.{' '}
        <Link className="error__link" to={AppRoute.Main}>
          Уходи.
        </Link>
      </p>
      <Footer />
    </div>
  );
}

export default Error404;
