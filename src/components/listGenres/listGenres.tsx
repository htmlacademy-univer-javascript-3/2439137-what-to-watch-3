import { useAppSelector } from '../hooks';
import { genres } from '../catalog/utils.ts';
import ItemListGenres from './genre.tsx';

export const ListGenres = () => {
  const activeGenre = useAppSelector((state) => state.genre);
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <ItemListGenres
          key={`key_${genre}`}
          title={genre}
          isActive={activeGenre === genre}
        />
      ))}
    </ul>
  );
};

export default ListGenres;
