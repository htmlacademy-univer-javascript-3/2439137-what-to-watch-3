import { dateToString } from '../filmCard/utils.ts';
import { CommentType } from '../../types/filmReview.ts';

interface OverviewProps {
  commentsFilm: CommentType[];
  commentsFilmsError: string | null;
  commentsFilmsLoadingStatus: boolean;
}

const ReviewItem = ({ user, date, comment, rating }: CommentType) => (
  <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{comment}</p>

      <footer className="review__details">
        <cite className="review__author">{user}</cite>
        <time className="review__date">{dateToString(new Date(date))}</time>
      </footer>
    </blockquote>

    {rating && <div className="review__rating">{rating}</div>}
  </div>
);

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
