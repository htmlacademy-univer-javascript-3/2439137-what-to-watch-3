import { FilmNav } from './types/filmNav.ts';
import { Genre } from './types/genre.ts';

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

export const catalogGenres: Genre[] = [
  { title: 'All genres', href: '#', isActive: true },
  { title: 'Comedies', href: '#', isActive: false },
  { title: 'Crime', href: '#', isActive: false },
  { title: 'Documentary', href: '#', isActive: false },
  { title: 'Dramas', href: '#', isActive: false },
  { title: 'Horror', href: '#', isActive: false },
  { title: 'Kids & Family', href: '#', isActive: false },
  { title: 'Romance', href: '#', isActive: false },
  { title: 'Sci-Fi', href: '#', isActive: false },
  { title: 'Thrillers', href: '#', isActive: false },
];
