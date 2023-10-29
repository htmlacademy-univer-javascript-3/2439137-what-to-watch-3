export type FilmType = {
  id: string;
  title: string;
  imgPath: string;
  backgroundImgPath?: string;
  genre?: string;
  releaseDate?: number;
  rating?: [string, number];
  runTime?: number;
  annotation?: string[];
  director?: string;
  starring?: string[];
  isMyList?: boolean;
};
