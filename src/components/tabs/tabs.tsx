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

interface FilmTabProps {
  title: string;
  view: JSX.Element;
}

export const Tabs = ({
  film,
  commentsFilms,
  commentsFilmsError,
  commentsFilmsLoadingStatus,
}: TabsProps) => {
  const [titleTab, setTitleTab] = useState('Overview');
  const tabs: FilmTabProps[] = [
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
  const activeTab = tabs.filter(({ title }) => title === titleTab)[0];
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
              {tabs.map((tab) => (
                <li
                  key={`key_${tab.title}`}
                  className={`film-nav__item ${
                    tab.title === titleTab ? 'film-nav__item--active' : ''
                  }`}
                  onClick={() => setTitleTab(tab.title)}
                >
                  <a
                    className="film-nav__link"
                  >
                    {tab.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {activeTab.view}
        </div>
      </div>
    </div>
  );
};
