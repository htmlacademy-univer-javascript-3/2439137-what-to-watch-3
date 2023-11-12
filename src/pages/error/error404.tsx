import Header, { HeaderType } from '../../components/header/header.tsx';
import Footer from '../../components/footer/footer.tsx';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';
import { useAppDispatch } from '../../components/hooks';
import { resetCatalog } from '../../store/action.ts';

function Error404(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div className="error">
      <Header headerType={HeaderType.Error} />
      <p className="error__emoji">(⊙_⊙)</p>
      <p className="error__number">404</p>
      <p className="error__text">
        Ты как сюда попал.{' '}
        <Link
          className="error__link"
          to={AppRoute.Main}
          onClick={() => dispatch(resetCatalog())}
        >
          Уходи.
        </Link>
      </p>
      <Footer />
    </div>
  );
}

export default Error404;
