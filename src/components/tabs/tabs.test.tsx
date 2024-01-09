import { render, screen } from '@testing-library/react';
import { testCommentsFilm, testFilm } from '../../utils/mocks.ts';
import { formatRunTimeFull, getStarringFullList } from '../film-card/utils.ts';
import { WrapDetails } from './details.index.tsx';
import { WrapReviews } from './reviews.index.tsx';

describe('Component: tabs', () => {
  const film = testFilm;
  const commentsFilm = testCommentsFilm;
  describe('Component: details', () => {
    it('should render correct', () => {
      render(<WrapDetails film={film} />);

      const directorContainer = screen.getByText('Director').parentElement;
      const starringContainer = screen.getByText('Starring').parentElement;
      const runTimeContainer = screen.getByText('Run Time').parentElement;
      const genreContainer = screen.getByText('Genre').parentElement;
      const releasedContainer = screen.getByText('Released').parentElement;

      expect(directorContainer).toBeInTheDocument();
      expect(directorContainer?.children[1].textContent).toBe(film.director);

      expect(starringContainer).toBeInTheDocument();
      expect(starringContainer?.children[1].textContent).toBe(
        getStarringFullList(film.starring),
      );

      expect(runTimeContainer).toBeInTheDocument();
      expect(runTimeContainer?.children[1].textContent).toBe(
        formatRunTimeFull(film.runTime),
      );

      expect(genreContainer).toBeInTheDocument();
      expect(genreContainer?.children[1].textContent).toBe(film.genre);

      expect(releasedContainer).toBeInTheDocument();
      expect(releasedContainer?.children[1].textContent).toBe(
        film.released.toString(),
      );
    });
  });

  describe('Component: reviews', () => {
    it('should render correct', () => {
      render(
        <WrapReviews
          commentsFilm={commentsFilm}
          commentsFilmsError={null}
          commentsFilmsLoadingStatus={false}
        />,
      );

      const commentsFilmFirstColumn = screen.getByTestId(
        'film-card__reviews-col__first',
      );
      const commentFilmSecondColumn = screen.getByTestId(
        'film-card__reviews-col__second',
      );
      const countReviews =
        (commentsFilmFirstColumn.children.length +
          commentFilmSecondColumn.children.length) |
        0;

      expect(countReviews).toBe(commentsFilm.length);
    });
  });
});
