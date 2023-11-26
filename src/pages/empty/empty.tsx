import Header, { HeaderType } from '../../components/header/header.tsx';
import Footer from '../../components/footer/footer.tsx';

function Empty({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <div className="empty">
      <Header headerType={HeaderType.Error} />
      {children}
      <Footer />
    </div>
  );
}

export default Empty;
