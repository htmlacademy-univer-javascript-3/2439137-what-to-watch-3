import { FilmType } from '../../types/film.ts';
import FilmCardReview from '../../components/filmCard/filmCardReview.tsx';

export interface AddReviewPros {
  film: FilmType;
}

function AddReview({ film }: AddReviewPros): JSX.Element {
  return <FilmCardReview film={film} />;
}

export default AddReview;
