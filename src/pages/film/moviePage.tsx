import { FilmType } from '../../types/film.ts';
import FilmCardFull from '../../components/filmCard/filmCardFull.tsx';
import { filmData } from '../main/filmData.ts';
import FilmCardSmall from '../../components/filmCard/filmCardSmall.tsx';
import Footer from '../../components/footer/footer.tsx';

export interface MoviePagePros {
  film: FilmType;
}

function MoviePage({ film }: MoviePagePros): JSX.Element {
  return (
    <>
      <FilmCardFull film={film} />
      <div className="page-content">
        {film.relatedMovies && (
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <div className="catalog__films-list">
              {filmData.map((movie) =>
                film.relatedMovies &&
                film.relatedMovies.indexOf(movie.title) + 1 ? (
                    <FilmCardSmall key={`key_${movie.title}`} film={movie} />
                  ) : undefined,
              )}
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}

export default MoviePage;
