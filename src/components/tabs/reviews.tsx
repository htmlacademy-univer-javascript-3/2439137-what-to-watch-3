import { CommentType } from '../../types/film-review.ts';
import { ReviewItem } from './review-item.tsx';

interface OverviewProps {
  commentsFilm: CommentType[];
  commentsFilmsError: string | null;
  commentsFilmsLoadingStatus: boolean;
}

export const Reviews = ({
  commentsFilm,
  commentsFilmsLoadingStatus,
  commentsFilmsError,
}: OverviewProps) => {
  const middleNumber = Math.ceil(commentsFilm.length / 2);
  const commentsFilmFirstColumn = commentsFilm.slice(0, middleNumber);
  const commentFilmSecondColumn = commentsFilm.slice(
    middleNumber,
    commentsFilm.length,
  );
  if (commentsFilmsLoadingStatus || commentsFilmsError) {
    return null;
  }

  return (
    <div className="film-card__reviews film-card__row">
      {commentsFilmFirstColumn && (
        <div
          className="film-card__reviews-col"
          data-testid={'film-card__reviews-col__first'}
        >
          {commentsFilmFirstColumn.map((comment) => (
            <ReviewItem key={`review_${comment.id}`} {...comment} />
          ))}
        </div>
      )}
      {commentFilmSecondColumn && (
        <div
          className="film-card__reviews-col"
          data-testid={'film-card__reviews-col__second'}
        >
          {commentFilmSecondColumn.map((comment) => (
            <ReviewItem key={`review_${comment.id}`} {...comment} />
          ))}
        </div>
      )}
    </div>
  );
};
