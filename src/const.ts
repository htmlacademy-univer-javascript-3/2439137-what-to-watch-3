import { FilmNav } from './types/filmNav.ts';

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
  FavoriteFilms = 'FAVORITE_FILMS'
}

export enum OperationFilmFavorite {
  ADD = 1,
  DEL = 0,
}

export const filmNav: FilmNav[] = [
  {
    title: 'Overview',
    href: '#',
    isActive: true,
  },
  {
    title: 'Details',
    href: '#',
    isActive: false,
  },
  {
    title: 'Reviews',
    href: '#',
    isActive: false,
  },
];
