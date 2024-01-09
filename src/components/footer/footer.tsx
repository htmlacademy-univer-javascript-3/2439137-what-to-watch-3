import { WrapLogo as Logo} from '../logo';

export const Footer = () => (
  <footer className="page-footer" data-testid={'footer'}>
    <Logo isLight/>

    <div className="copyright">
      <p>© 2019 What to watch Ltd.</p>
    </div>
  </footer>
);
