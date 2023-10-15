import { filmData } from '../../pages/main/filmData.ts';
import { FilmType } from '../../types/film.ts';
import { catalogGenres } from './catalog.ts';
import { Genre } from '../../types/genre.ts';
import FilmCardSmall from '../filmCard/filmCardSmall.tsx';

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
      {catalogGenres.map(({ title, href, isActive }) => (
        <CatalogItem
          key={`key_${title}`}
          title={title}
          href={href}
          isActive={isActive}
        />
      ))}
    </ul>

    <div className="catalog__films-list">
      {filmData
        .filter(({ title }) => title !== film.title)
        .map(({ title, imgPath }) => (
          <FilmCardSmall key={`key_${title}`} film={{ title, imgPath }} />
        ))}
    </div>

    <div className="catalog__more">
      <button className="catalog__button" type="button">
        Show more
      </button>
    </div>
  </section>
);

export default Catalog;
