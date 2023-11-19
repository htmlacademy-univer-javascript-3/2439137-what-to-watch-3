import { Genre } from '../../types/genre.ts';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setGenre } from '../../store/action.ts';
import { genreSelector } from '../../store/selectors.ts';

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
