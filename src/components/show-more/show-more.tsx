import { useCallback } from 'react';
import { DEFAULT_FILM_AMOUNT } from '../catalog/utils.ts';
import { FilmType } from '../../types/film.ts';

interface ShowMoreProps {
  filmsGenre: FilmType[];
  lengthFilmsGenre: number;
  setLengthFilmsGenre: (number: (previousLength: number) => number) => void;
}

export const ShowMore = ({
  filmsGenre,
  lengthFilmsGenre,
  setLengthFilmsGenre,
}: ShowMoreProps) => {
  const handleShowMore = useCallback(() => {
    setLengthFilmsGenre((previousLength) =>
      Math.min(previousLength + DEFAULT_FILM_AMOUNT, filmsGenre.length),
    );
  }, [filmsGenre.length, setLengthFilmsGenre]);

  if (lengthFilmsGenre >= filmsGenre.length) {
    return null;
  }
  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={handleShowMore}
      >
        Show more
      </button>
    </div>
  );
};
