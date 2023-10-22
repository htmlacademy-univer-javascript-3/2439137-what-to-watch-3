import Footer from '../../components/footer/footer.tsx';
import Header, { HeaderType } from '../../components/header/header.tsx';
import { films } from '../../mocks/films.ts';
import CatalogFilms from '../../components/catalog/catalogFilms.tsx';

function MyList(): JSX.Element {
  return (
    <div className="user-page">
      <Header headerType={HeaderType.MyList}>
        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">9</span>
        </h1>
      </Header>
      {films && (
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <CatalogFilms films={films.filter(({ isMyList }) => isMyList)}/>
        </section>
      )}
      <Footer />
    </div>
  );
}

export default MyList;
