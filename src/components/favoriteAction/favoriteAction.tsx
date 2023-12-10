import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  authorizationStatusSelector,
  filmPromoSelector,
  filmsFavoriteSelector,
} from '../../store/selectors.ts';
import { AuthorizationStatus, OperationFilmFavorite } from '../../const.ts';
import { fetchFilmsFavoriteChangeStatusAction } from '../../store/api-actions.ts';

const status = (isFavorite: null | boolean) =>
  isFavorite ? OperationFilmFavorite.DEL : OperationFilmFavorite.ADD;

const FavoriteAction = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(authorizationStatusSelector).data;
  const filmPromo = useAppSelector(filmPromoSelector);
  const filmFavorite = useAppSelector(filmsFavoriteSelector);
  const lengthFilmFavorite = useMemo(() => filmFavorite.length, [filmFavorite]);
  const isFavorite = useMemo(
    () => (filmPromo ? filmPromo.isFavorite : null),
    [filmPromo],
  );

  if (authorizationStatus !== AuthorizationStatus.Auth || !filmPromo) {
    return null;
  }

  const onClick = () => {
    if (filmPromo) {
      dispatch(
        fetchFilmsFavoriteChangeStatusAction({
          filmId: filmPromo.id,
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
