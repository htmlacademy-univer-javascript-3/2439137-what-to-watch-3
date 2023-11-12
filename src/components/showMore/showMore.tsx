import {
  DEFAULT_FILM_AMOUNT,
} from '../catalog/utils.ts';
import {useAppDispatch, useAppSelector} from '../hooks';
import {changeCountListGenres} from '../../store/action.ts';

const ShowMore = () => {
  const dispatch = useAppDispatch();
  const countListGenres = useAppSelector((state) => state.countListGenres);
  const listFilmsGenre = useAppSelector((state) => state.listFilms);

  const handleShowMore = () => {
    dispatch(
      changeCountListGenres({
        countListGenres: Math.min(
          countListGenres + DEFAULT_FILM_AMOUNT,
          listFilmsGenre.length,
        ),
      }),
    );
  };
  if (countListGenres >= listFilmsGenre.length) {
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
