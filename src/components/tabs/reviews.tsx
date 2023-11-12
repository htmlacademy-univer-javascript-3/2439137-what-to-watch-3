import { dateToString } from '../filmCard/utils.ts';
import { FilmType } from '../../types/film.ts';
import { reviews } from '../../mocks/reviews.ts';
import { ReviewType } from '../../types/filmReview.ts';

interface OverviewProps {
  film: FilmType;
}

const ReviewItem = ({ author, date, text, rating }: ReviewType) => (
  <div className="review">
    <blockquote className="review__quote">
      {text && <p className="review__text">{text}</p>}

      {(author || date) && (
        <footer className="review__details">
          {author && <cite className="review__author">{author}</cite>}
          {date && (
            <time
              className="review__date"
              dateTime={date.toISOString().split('T')[0]}
            >
              {dateToString(date)}
            </time>
          )}
        </footer>
      )}
    </blockquote>

    {rating && <div className="review__rating">{rating}</div>}
  </div>
);

const Reviews = ({ film }: OverviewProps) => {
  const reviewsList = reviews.find(({ id }) => id === film.id)?.reviews || [];
  const reviewsListFirstColumn = reviewsList.slice(0, reviewsList.length / 2);
  const reviewsListSecondColumn = reviewsList.slice(
    reviewsList.length / 2,
    reviewsList.length,
  );

  return (
    reviewsList && (
      <div className="film-card__reviews film-card__row">
        {reviewsListFirstColumn && (
          <div className="film-card__reviews-col">
            {reviewsListFirstColumn.map((review) => (
              <ReviewItem
                key={`review_${film.id}_${review.author}`}
                {...review}
              />
            ))}
          </div>
        )}
        {reviewsListSecondColumn && (
          <div className="film-card__reviews-col">
            {reviewsListSecondColumn.map((review) => (
              <ReviewItem
                key={`review_${film.id}_${review.author}`}
                {...review}
              />
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default Reviews;
