import Logo from '../logo/logo.tsx';

export const Footer = () => (
  <footer className="page-footer" data-testid={'footer'}>
    <Logo isLight/>

    <div className="copyright">
      <p>© 2019 What to watch Ltd.</p>
    </div>
  </footer>
);

export default Footer;
