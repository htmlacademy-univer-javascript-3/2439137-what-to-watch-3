import Footer from '../../components/footer/footer.tsx';
import Header from '../../components/header/header.tsx';
import { filmData } from '../main/filmData.ts';
import FilmCardSmall from '../../components/filmCard/filmCardSmall.tsx';

function MyList(): JSX.Element {
  return (
    <div className="user-page">
      <Header>
        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">9</span>
        </h1>
      </Header>
      {filmData && (
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <div className="catalog__films-list">
            {filmData
              .filter(({ isMyList }) => isMyList)
              .map(({ title, imgPath }) => (
                <FilmCardSmall key={`key_${title}`} film={{ title, imgPath }} />
              ))}{' '}
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}

export default MyList;
