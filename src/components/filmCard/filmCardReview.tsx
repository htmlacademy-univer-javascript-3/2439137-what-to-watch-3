import Header, { HeaderType } from '../header/header.tsx';
import { FormEvent, useState } from 'react';
import { FilmFullType } from '../../types/film.ts';
import { APIRoute } from '../../services/const.ts';
import { AxiosError } from 'axios';
import { fetchCommentsFilmAction } from '../../store/api-actions.ts';
import { api } from '../../store';
import { useAppDispatch } from '../../hooks';
import LoadingScreen from '../loadingScreen/loadingScreen.tsx';
import Error from '../error/error.tsx';

const MAX_RATING = 10;

type RatingType = {
  review: string;
  rating: string;
  username: string;
  data: string;
};

interface FilmCardReviewProps {
  film: FilmFullType;
}

const FilmCardReview = ({ film }: FilmCardReviewProps) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [postDisabledRating, setPostDisabledRating] = useState(true);
  const [postDisabledText, setPostDisabledText] = useState(true);
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

  const onClick = async () => {
    try {
      setLoading(true);
      await api.post(`${APIRoute.FilmComments}/${film.id}`, {
        comment: reviewData.review,
        rating: reviewData.rating,
      });
      setLoading(false);
      dispatch(fetchCommentsFilmAction({ filmId: film.id }));
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.message);
        setLoading(false);
      }
    }
  };

  const onChangeRating = (
    evt: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>,
  ) => {
    reviewChange(evt);

    setPostDisabledRating(!(evt.target as HTMLButtonElement).value);
  };

  const onChangeText = (
    evt: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>,
  ) => {
    reviewChange(evt);
    if (
      (evt.target as HTMLButtonElement).value.length >= 50 &&
      (evt.target as HTMLButtonElement).value.length <= 400
    ) {
      setPostDisabledText(false);
    } else {
      setPostDisabledText(true);
    }
  };
  if (loading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <Header headerType={HeaderType.Auth} />

        <div className="film-card__poster film-card__poster--small">
          <img
            src={film.posterImage}
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
                      onChange={onChangeRating}
                      className="rating__input"
                      id={`star-${number}`}
                      type="radio"
                      name="rating"
                      value={number}
                      data-testid={`star-${number}`}
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
              onChange={onChangeText}
              value={reviewData.review}
              data-testid={'review-text'}
              maxLength={400}
              minLength={50}
            />
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="button"
                onClick={() => onClick}
                disabled={postDisabledText || postDisabledRating}
              >
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
