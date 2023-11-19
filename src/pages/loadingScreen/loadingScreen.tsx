import Header, { HeaderType } from '../../components/header/header.tsx';

import Footer from '../../components/footer/footer.tsx';

function LoadingScreen(): JSX.Element {
  return (
    <div className="error">
      <Header headerType={HeaderType.Error} />
      <div className="loader_container">
        <span className="loader"></span>
      </div>
      <Footer />
    </div>
  );
}

export default LoadingScreen;
