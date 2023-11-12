import { FilmNav } from './types/filmNav.ts';

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  Error = '/*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
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
