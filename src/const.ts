export const AppRoute = {
  Main: '/',
  SignIn: '/login',
  MyList: '/mylist',
  Film: (id?: string) => `/films/${id || ':id'}`,
  AddReview: (id?: string) => `/films/${id || ':id'}/review`,
  Player: (id?: string) => `/player/${id || ':id'}`,
  Error: '/*',
};

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  User = 'USER',
  Film = 'FILM',
  Films = 'FILMS',
  PromoFilm = 'PROMO_FILM',
  FavoriteFilms = 'FAVORITE_FILMS',
}

export enum OperationFilmFavorite {
  Add = 1,
  Del = 0,
}
