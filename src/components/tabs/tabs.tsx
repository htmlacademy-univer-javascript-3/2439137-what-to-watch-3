import { FilmFullType } from '../../types/film.ts';
import { useState } from 'react';
import { CommentType } from '../../types/film-review.ts';
import { WrapOverview } from './overview.index.tsx';
import { WrapDetails } from './details.index.tsx';
import { WrapReviews } from './reviews.index.tsx';

interface TabsProps {
  film: FilmFullType;
  commentsFilms: CommentType[];
  commentsFilmsError: string | null;
  commentsFilmsLoadingStatus: boolean;
}

interface FilmNavProps {
  title: string;
  view: JSX.Element;
}

export const Tabs = ({
  film,
  commentsFilms,
  commentsFilmsError,
  commentsFilmsLoadingStatus,
}: TabsProps) => {
  const [titleNav, setTitleNav] = useState('Overview');
  const filmNav: FilmNavProps[] = [
    {
      title: 'Overview',
      view: <WrapOverview film={film} />,
    },
    {
      title: 'Details',
      view: <WrapDetails film={film} />,
    },
    {
      title: 'Reviews',
      view: (
        <WrapReviews
          commentsFilm={commentsFilms}
          commentsFilmsError={commentsFilmsError}
          commentsFilmsLoadingStatus={commentsFilmsLoadingStatus}
        />
      ),
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
