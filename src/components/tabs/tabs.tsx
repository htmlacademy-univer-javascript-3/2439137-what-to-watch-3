import { FilmFullType } from '../../types/film.ts';
import Overview from './overview.tsx';
import { useState } from 'react';
import Details from './details.tsx';
import Reviews from './reviews.tsx';
import { CommentType } from '../../types/filmReview.ts';

interface TabsProps {
  film: FilmFullType;
  commentsFilms: CommentType[];
}

interface FilmNavProps {
  title: string;
  view: JSX.Element;
}

const Tabs = ({ film, commentsFilms }: TabsProps) => {
  const [titleNav, setTitleNav] = useState('Overview');
  const filmNav: FilmNavProps[] = [
    {
      title: 'Overview',
      view: <Overview film={film} />,
    },
    {
      title: 'Details',
      view: <Details film={film} />,
    },
    {
      title: 'Reviews',
      view: <Reviews commentsFilm={commentsFilms} />,
    },
  ];
  const activeNav = filmNav.filter(({ title }) => title === titleNav)[0];
  return (
    <div className="film-card__wrap film-card__translate-top">
      <div className="film-card__info">
        <div className="film-card__poster film-card__poster--big">
          <img
            src={film.posterImage}
            alt={film.name}
            width="218"
            height="327"
          />
        </div>

        <div className="film-card__desc">
          <nav className="film-nav film-card__nav">
            <ul className="film-nav__list">
              {filmNav.map((nav) => (
                <li
                  key={`key_${nav.title}`}
                  className={`film-nav__item ${
                    nav.title === titleNav ? 'film-nav__item--active' : ''
                  }`}
                  onClick={() => setTitleNav(nav.title)}
                >
                  <a
                    /*href={`#${nav.title.toLowerCase().replace(' ', '_')}`}*/
                    className="film-nav__link"
                  >
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {activeNav.view}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
