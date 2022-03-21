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

export enum APIRoute {
  Films = '/films',
  Film = '/films/:id',
  SimilarFilm = '/films/:id/Similar',
  PromoFilm = '/promo',
  Favorite = '/favorite',
  Comments = '/comments/:id',
  Login = '/login',
  Logout = '/logout',
}

export const DEFAULT_GENRE = 'All genres';
export const PREVIEW_TIMEOUT= 1000;
export const FILM_CARDS_COUNT = 8;
export const FILM_CARDS_COUNT_STEP = 8;
