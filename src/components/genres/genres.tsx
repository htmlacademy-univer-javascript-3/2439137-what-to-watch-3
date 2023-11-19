import { genres } from '../catalog/utils.ts';
import GenresItem from './genre.tsx';

const Genres = () => (
  <ul className="catalog__genres-list">
    {genres.map((genre) => (
      <GenresItem key={`key_${genre}`} title={genre} />
    ))}
  </ul>
);

export default Genres;
