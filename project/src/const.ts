import { Rating, Tab } from './types/types';

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum APIRoute {
  Films = '/films',
  Film = '/films/',
  SimilarFilms = '/films/',
  PromoFilm = '/promo',
  Favorite = '/favorite',
  Comments = '/comments/',
  Login = '/login',
  Logout = '/logout',
}

export enum NameSpace {
  data = 'DATA',
  film = 'FILM',
  user = 'USER',
}

export enum RATING {
  BAD = 'Bad',
  NORMAL = 'Normal',
  GOOD = 'Good',
  VERY_GOOD = 'Very good',
  AWESOME = 'Awesome',
}

export enum GRADE {
  BAD = 3,
  NORMAL = 5,
  GOOD = 8,
  VERY_GOOD = 10,
}

export const RATING_VALUES: Rating[] = [
  {'value': 10},
  {'value': 9},
  {'value': 8},
  {'value': 7},
  {'value': 6},
  {'value': 5},
  {'value': 4},
  {'value': 3},
  {'value': 2},
  {'value': 1},
];

export const movieTab: Tab[] = [
  {
    id: 1,
    title: 'Overview',
  },
  {
    id: 2,
    title: 'Details',
  },
  {
    id: 3,
    title: 'Reviews',
  },
];

export const DEFAULT_GENRE = 'All genres';
export const PREVIEW_TIMEOUT= 1000;
export const FILM_CARDS_COUNT = 8;
export const FILM_CARDS_COUNT_STEP = 8;
export const MIN_LENGTH = 2;
