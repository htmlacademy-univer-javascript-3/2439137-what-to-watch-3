import { HeaderWrap as Header, HeaderType } from '../../components/header';
import Footer from '../../components/footer/footer.tsx';

function Empty({ children }: { children: JSX.Element | null }): JSX.Element {
  return (
    <div className="empty">
      <Header headerType={HeaderType.Empty} />
      {children}
      <Footer />
    </div>
  );
}

export default Empty;
