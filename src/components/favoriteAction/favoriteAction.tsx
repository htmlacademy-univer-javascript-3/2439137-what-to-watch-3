import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { AuthorizationStatus, OperationFilmFavorite } from '../../const.ts';
import { authorizationStatusSelector } from '../../store/userProcess/selectors.ts';
import LoadingScreen from '../loadingScreen/loadingScreen.tsx';
import { favoriteFilmsSelector } from '../../store/favoriteFilmsProcess/selectors.ts';
import { filmSelector } from '../../store/filmProcess/selectors.ts';
import { fetchChangeStatusFilmFavoriteAction } from '../../store/api-actions.ts';

const status = (isFavorite: null | boolean) =>
  isFavorite ? OperationFilmFavorite.DEL : OperationFilmFavorite.ADD;

const FavoriteAction = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(authorizationStatusSelector);
  const film = useAppSelector(filmSelector);
  const filmFavorite = useAppSelector(favoriteFilmsSelector);
  const lengthFilmFavorite = useMemo(() => filmFavorite.length, [filmFavorite]);
  const isFavorite = useMemo(() => (film ? film.isFavorite : null), [film]);

  if (authorizationStatus !== AuthorizationStatus.Auth || !film) {
    return null;
  }

  if (!film) {
    <LoadingScreen />;
  }

  const onClick = () => {
    if (film !== null) {
      dispatch(
        fetchChangeStatusFilmFavoriteAction({
          filmId: film.id,
          status: status(isFavorite),
        }),
      );
    }
  };

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={onClick}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        {isFavorite ? (
          <use xlinkHref="#in-list"></use>
        ) : (
          <use xlinkHref="#add"></use>
        )}
      </svg>
      <span>My list</span>
      <span className="film-card__count">{lengthFilmFavorite}</span>
    </button>
  );
};
export default FavoriteAction;
