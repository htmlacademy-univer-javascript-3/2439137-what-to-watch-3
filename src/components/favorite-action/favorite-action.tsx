import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const.ts';
import { favoriteFilmsSelector } from '../../store/favorite-films-process/selectors.ts';
import {
  fetchChangeStatusFilmFavoriteAction,
  fetchFavoriteFilmsAction,
} from '../../store/api-actions.ts';
import { getStatus } from './utils.ts';
import { FilmFullType, PromoFilmType } from '../../types/film.ts';

interface FavoriteActionProps {
  authorizationStatus: AuthorizationStatus;
  film: FilmFullType | PromoFilmType;
}

export const FavoriteAction = ({
  authorizationStatus,
  film,
}: FavoriteActionProps) => {
  const dispatch = useAppDispatch();
  const filmsFavorite = useAppSelector(favoriteFilmsSelector);
  const lengthFilmFavorite = useMemo(
    () => filmsFavorite.length,
    [filmsFavorite],
  );
  const [isFavorite, setIsFavorite] = useState(film ? film.isFavorite : false);
  if (authorizationStatus !== AuthorizationStatus.Auth || !film) {
    return null;
  }

  const handleFavoriteChange = () => {
    if (film !== null) {
      dispatch(
        fetchChangeStatusFilmFavoriteAction({
          filmId: film.id,
          status: getStatus(isFavorite),
        }),
      ).then(() => {
        dispatch(fetchFavoriteFilmsAction());
        setIsFavorite(!isFavorite);
      });
    }
  };

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={handleFavoriteChange}
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
