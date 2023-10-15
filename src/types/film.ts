export type FilmType = {
  title: string;
  imgPath: string;
  backgroundImgPath?: string;
  genre?: string;
  releaseDate?: number;
  rating?: [string, number];
  annotation?: string[];
  director?: string;
  starring?: string[];
  relatedMovies?: string[];
  isMyList?: boolean;
};
