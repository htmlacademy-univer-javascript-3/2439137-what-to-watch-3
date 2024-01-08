import { render, screen } from '@testing-library/react';
import Details from './details.tsx';
import { testCommentsFilm, testFilm } from '../../utils/mocks.ts';
import {
  runTimeSelector,
  starringToStringColumn,
} from '../filmCard/utils.ts';
import Reviews from './reviews.tsx';

describe('Component: tabs', () => {
  const film = testFilm;
  const commentsFilm = testCommentsFilm;
  describe('Component: details', () => {
    it('should render correct', () => {
      render(<Details film={film} />);

      const directorContainer = screen.getByText('Director').parentElement;
      const starringContainer = screen.getByText('Starring').parentElement;
      const runTimeContainer = screen.getByText('Run Time').parentElement;
      const genreContainer = screen.getByText('Genre').parentElement;
      const releasedContainer = screen.getByText('Released').parentElement;

      expect(directorContainer).toBeInTheDocument();
      expect(directorContainer?.children[1].textContent).toBe(film.director);

      expect(starringContainer).toBeInTheDocument();
      expect(starringContainer?.children[1].textContent).toBe(
        starringToStringColumn(film.starring),
      );

      expect(runTimeContainer).toBeInTheDocument();
      expect(runTimeContainer?.children[1].textContent).toBe(
        runTimeSelector(film.runTime),
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
      render(<Reviews commentsFilm={commentsFilm} />);

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
