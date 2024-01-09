import { formatDate } from '../film-card/utils.ts';
import { CommentType } from '../../types/film-review.ts';

export const ReviewItem = ({ user, date, comment, rating }: CommentType) => (
  <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{comment}</p>

      <footer className="review__details">
        <cite className="review__author">{user}</cite>
        <time className="review__date">{formatDate(new Date(date))}</time>
      </footer>
    </blockquote>

    {rating && <div className="review__rating">{rating}</div>}
  </div>
);
