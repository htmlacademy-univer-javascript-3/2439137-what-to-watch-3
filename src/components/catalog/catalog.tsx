import { films } from '../../mocks/films.ts';
import { FilmType } from '../../types/film.ts';
import { Genre } from '../../types/genre.ts';
import CatalogFilms from './catalogFilms.tsx';

interface CatalogProps {
  film: FilmType;
}

const CatalogItem = ({ title, href, isActive }: Genre) => (
  <li
    key={`key_${title}`}
    className={`catalog__genres-item ${
      isActive ? 'catalog__genres-item--active' : ''
    }`}
  >
    <a href={href} className="catalog__genres-link">
      {title}
    </a>
  </li>
);

const Catalog = ({ film }: CatalogProps) => (
  <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>

    <ul className="catalog__genres-list">
      <CatalogItem
        key={'key_all_genres'}
        title={'All genres'}
        href={'#all_genres'}
        isActive
      />
      {[...new Set(films.map(({ genre }) => genre))].map(
        (genre) =>
          genre && (
            <CatalogItem
              key={`key_${genre}`}
              title={genre}
              href={`#${genre.toLowerCase().replace(' ', '_')}`}
              isActive={false}
            />
          ),
      )}
    </ul>

    <CatalogFilms
      films={films.filter(({ id }) => id !== film.id)}
      countFilmsInfo={8}
    />
  </section>
);

export default Catalog;
