import {
  authorizationStatusSelector,
  filmPromoSelector,
  filmsFavoriteSelector,
} from '../../store/selectors.ts';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useMemo } from 'react';
import { AuthorizationStatus, OperationFilmFavorite } from '../../const.ts';
import { fetchFilmsFavoriteChangeStatusAction } from '../../store/api-actions.ts';

const status = (isFavorite: boolean) => {
  switch (isFavorite) {
    case true:
      return OperationFilmFavorite.DEL;
    case false:
      return OperationFilmFavorite.ADD;
  }
};

const ButtonMyLists = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(authorizationStatusSelector).data;
  const filmPromo = useAppSelector(filmPromoSelector);
  const filmFavorite = useAppSelector(filmsFavoriteSelector);
  const lengthFilmFavorite = useMemo(() => filmFavorite.length, [filmFavorite]);
  const isFavorite = useMemo(
    () => (filmPromo ? filmPromo.isFavorite : null),
    [filmPromo],
  );

  if (
    authorizationStatus !== AuthorizationStatus.Auth ||
    !filmPromo
  ) {
    return null;
  }

  const onClick = () => {
    if (isFavorite !== null) {
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
export default ButtonMyLists;
