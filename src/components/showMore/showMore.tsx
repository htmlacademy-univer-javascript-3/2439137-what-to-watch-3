import { DEFAULT_FILM_AMOUNT } from '../catalog/utils.ts';
import { FilmType } from '../../types/film.ts';

interface ShowMoreProps {
  filmsGenre: FilmType[];
  lengthFilmsGenre: number;
  setLengthFilmsGenre: (number: number) => void;
}

const ShowMore = ({
  filmsGenre,
  lengthFilmsGenre,
  setLengthFilmsGenre,
}: ShowMoreProps) => {
  const handleShowMore = () => {
    setLengthFilmsGenre(Math.min(lengthFilmsGenre + DEFAULT_FILM_AMOUNT));
  };

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
export default ShowMore;
