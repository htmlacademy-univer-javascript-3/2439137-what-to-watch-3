import { Genre } from '../../types/genre.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { genreSelector } from '../../store/filmsProcess/selectors.ts';
import { setGenre } from '../../store/filmsProcess/filmsProcess.ts';

const GenresItem = ({ title }: Genre) => {
  const dispatch = useAppDispatch();
  const currentGenre = useAppSelector(genreSelector);
  const onClick = () => {
    dispatch(setGenre(title));
  };
  return (
    <li
      key={`key_${title}`}
      className={`catalog__genres-item ${
        currentGenre === title ? 'catalog__genres-item--active' : ''
      }`}
    >
      <a className="catalog__genres-link" onClick={onClick}>
        {title}
      </a>
    </li>
  );
};

export default GenresItem;
