import { FormEvent, useState } from 'react';
import { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { WrapHeader as Header, HeaderType } from '../header';
import { FilmFullType } from '../../types/film.ts';
import { APIRoute } from '../../services/const.ts';
import { fetchCommentsFilmAction } from '../../store/api-actions.ts';
import { api } from '../../store';
import { useAppDispatch } from '../../hooks';
import { LoadingScreen } from '../loading-screen/loading-screen.tsx';
import { AppRoute } from '../../const.ts';
import { ErrorBlock } from '../error/error-block.tsx';

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

export const FilmCardReview = ({ film }: FilmCardReviewProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
  const handleReviewChange = (
    evt: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>,
  ) => {
    if (evt.target) {
      const { name, value } = evt.currentTarget;
      setReviewData({ ...reviewData, [name]: value });
    }
  };

  const handleReviewSubmit = async () => {
    try {
      setLoading(true);
      await api.post(`${APIRoute.FilmComments}/${film.id}`, {
        comment: reviewData.review,
        rating: Number(reviewData.rating),
      });
      setLoading(false);
      dispatch(fetchCommentsFilmAction({ filmId: film.id }));
      navigate(-1);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.message);
        setLoading(false);
      }
    }
  };

  const handleRatingChange = (
    evt: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>,
  ) => {
    handleReviewChange(evt);
    setPostDisabledRating(!(evt.target as HTMLButtonElement).value);
  };

  const handleTextChange = (
    evt: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>,
  ) => {
    handleReviewChange(evt);
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

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <Header headerType={HeaderType.AddReview}>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoute.Film(film.id)}>
                  {film.name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img
            src={film.posterImage}
            alt="The Grand Budapest Hotel poster"
            width="218"
            height="327"
          />
        </div>
      </div>

      {error ? (
        <ErrorBlock message={error} />
      ) : (
        <div className="add-review">
          <form action="#" className="add-review__form">
            <div className="rating">
              <div className="rating__stars">
                {Array.from({ length: MAX_RATING }, (_, i) => i + 1)
                  .reverse()
                  .map((number) => (
                    <div key={number}>
                      <input
                        onChange={handleRatingChange}
                        className="rating__input"
                        id={`star-${number}`}
                        key={`star-${number}`}
                        type="radio"
                        name="rating"
                        value={number}
                        data-testid={`star-${number}`}
                      />
                      <label
                        className="rating__label"
                        htmlFor={`star-${number}`}
                        key={`star-number-${number}`}
                      >
                        Rating {number}
                      </label>
                    </div>
                  ))}
              </div>
            </div>

            <div className="add-review__text">
              <textarea
                className="add-review__textarea"
                name="review"
                id="review-text"
                placeholder="Review text"
                onChange={handleTextChange}
                value={reviewData.review}
                data-testid={'review-text'}
                maxLength={400}
                minLength={50}
              />
              <div className="add-review__submit">
                <button
                  className="add-review__btn"
                  type="button"
                  onClick={() => {
                    handleReviewSubmit();
                  }}
                  disabled={postDisabledText || postDisabledRating || loading}
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};
