import { Genre } from '../../types/genre.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { genreSelector } from '../../store/films-process/selectors.ts';
import { setGenre } from '../../store/films-process/films-process.ts';

export const GenresItem = ({ title }: Genre) => {
  const dispatch = useAppDispatch();
  const currentGenre = useAppSelector(genreSelector);
  const handleGenreChange = () => {
    dispatch(setGenre(title));
  };
  return (
    <li
      key={`key_${title}`}
      className={`catalog__genres-item ${
        currentGenre === title ? 'catalog__genres-item--active' : ''
      }`}
    >
      <a className="catalog__genres-link" onClick={handleGenreChange}>
        {title}
      </a>
    </li>
  );
};
