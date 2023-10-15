import Header from '../../components/header/header.tsx';
import Footer from '../../components/footer/footer.tsx';

function Error404(): JSX.Element {
  return (
    <div className="error">
      <Header error />
      <p className="error__emoji">(⊙_⊙)</p>
      <p className="error__number">404</p>
      <p className="error__text">
        Ты как сюда попал.{' '}
        <a className="error__link" href="javascript:history.back()">
          Уходи.
        </a>
      </p>
      <Footer />
    </div>
  );
}

export default Error404;
