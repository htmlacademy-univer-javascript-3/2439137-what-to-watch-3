import { FilmType } from '../../types/film.ts';
import FilmCardFull from '../../components/filmCard/filmCardFull.tsx';
import { films } from '../../mocks/films.ts';
import Footer from '../../components/footer/footer.tsx';
import CatalogFilms from '../../components/catalog/catalogFilms.tsx';
import Tabs from '../../components/tabs/tabs.tsx';

//import { ReviewType } from '../../types/filmReview.ts';
const COUNT_LIKE_FILMS = 4;

export interface MoviePagePros {
  film: FilmType;
  //  reviews: ReviewType;
}

function MoviePage({ film }: MoviePagePros): JSX.Element {
  const moreLikeFilms = films
    .filter(({ genre, id }) => film.genre && genre && film.id !== id)
    .slice(0, COUNT_LIKE_FILMS);
  return (
    <>
      <section className="film-card film-card--full">
        <FilmCardFull film={film} />
        <Tabs film={film} />
      </section>
      <div className="page-content">
        {moreLikeFilms && (
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <CatalogFilms films={moreLikeFilms} />
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}

export default MoviePage;
