import Header, { HeaderType } from '../header/header.tsx';
import { FilmCardProps } from './filmCard.tsx';
import { FormEvent, useState } from 'react';

const MAX_RATING = 10;

type RatingType = {
  review: string;
  rating: string;
  username: string;
  data: string;
};

const FilmCardReview = ({ film }: FilmCardProps) => {
  const [reviewData, setReviewData] = useState<RatingType>({
    review: '',
    rating: '',
    username: '',
    data: '',
  });
  const reviewChange = (
    evt: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>,
  ) => {
    if (evt.target) {
      const { name, value } = evt.currentTarget;
      setReviewData({ ...reviewData, [name]: value });
    }
  };

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImgPath} alt={film.title} />
        </div>

        <Header headerType={HeaderType.Auth} />

        <div className="film-card__poster film-card__poster--small">
          <img
            src="img/the-grand-budapest-hotel-poster.jpg"
            alt="The Grand Budapest Hotel poster"
            width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              {Array.from({ length: MAX_RATING }, (_, i) => i + 1)
                .reverse()
                .map((number) => (
                  <>
                    <input
                      onChange={reviewChange}
                      className="rating__input"
                      id={`star-${number}`}
                      type="radio"
                      name="rating"
                      value={number}
                    />
                    <label className="rating__label" htmlFor={`star-${number}`}>
                      Rating {number}
                    </label>
                  </>
                ))}
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review"
              id="review-text"
              placeholder="Review text"
              onChange={reviewChange}
              value={reviewData.review}
            />
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FilmCardReview;
