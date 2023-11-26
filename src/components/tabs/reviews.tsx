import { dateToString } from '../filmCard/utils.ts';
import { CommentType } from '../../types/filmReview.ts';

interface OverviewProps {
  commentsFilm: CommentType[];
}

const ReviewItem = ({ user, date, comment, rating }: CommentType) => (
  <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{comment}</p>

      <footer className="review__details">
        <cite className="review__author">{user}</cite>
        <time
          className="review__date"
          dateTime={new Date(date).toISOString().split('T')[0]}
        >
          {dateToString(new Date(date))}
        </time>
      </footer>
    </blockquote>

    {rating && <div className="review__rating">{rating}</div>}
  </div>
);

const Reviews = ({ commentsFilm }: OverviewProps) => {
  const commentsFilmFirstColumn = commentsFilm.slice(
    0,
    commentsFilm.length / 2,
  );
  const commentFilmSecondColumn = commentsFilm.slice(
    commentsFilm.length / 2,
    commentsFilm.length,
  );

  return (
    <div className="film-card__reviews film-card__row">
      {commentsFilmFirstColumn && (
        <div className="film-card__reviews-col">
          {commentsFilmFirstColumn.map((comment) => (
            <ReviewItem
              key={`review_${comment.id}`}
              {...comment}
            />
          ))}
        </div>
      )}
      {commentFilmSecondColumn && (
        <div className="film-card__reviews-col">
          {commentFilmSecondColumn.map((comment) => (
            <ReviewItem
              key={`review_${comment.id}`}
              {...comment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
