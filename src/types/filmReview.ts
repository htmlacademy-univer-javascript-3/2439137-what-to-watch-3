export type ReviewsType = {
  id: string;
  reviews: ReviewType[];
};

export type ReviewType = {
  author: string;
  date: Date;
  text: string;
  rating: string;
};
