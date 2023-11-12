import { Genre } from '../../types/genre.ts';
import { useAppDispatch } from '../hooks';
import { changeGenre, getListFilmsByGenre } from '../../store/action.ts';

const ItemListGenres = ({ title, isActive }: Genre) => {
  const dispatch = useAppDispatch();
  return (
    <li
      key={`key_${title}`}
      className={`catalog__genres-item ${
        isActive ? 'catalog__genres-item--active' : ''
      }`}
    >
      <a
        className="catalog__genres-link"
        onClick={() => {
          dispatch(changeGenre({ genre: title }));
          dispatch(getListFilmsByGenre());
        }}
      >
        {title}
      </a>
    </li>
  );
};

export default ItemListGenres;
