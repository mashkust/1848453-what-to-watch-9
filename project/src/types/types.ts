import { AuthorizationStatus } from '../const.js';
import {store} from '../store/index.js';


export type Film = {
  id: number,
  name: string,
  posterImage: string,
  previewImage: string,
  backgroundImage: string,
  backgroundColor: string,
  videoLink: string,
  previewVideoLink: string,
  description: string,
  rating: number,
  scoresCount: number,
  director: string,
  starring: [string],
  runTime: number,
  genre: string,
  released: number,
  isFavorite: boolean,

  isActive?: boolean
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserData = {
  id: number,
  email: string,
  name: string,
  avatarUrl: string,
  token: string,
};

export type AuthData = {
  login: string;
  password: string;
};

export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  };
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userData: UserData | object,
  errorText: null | string,
};

export type FilmProcess = {
  activeGenre: string,
  filmCardsCount: number,
};

export type FilmData = {
  activeGenre: string,
  films: Film[],
  promoFilm: Film | object ,
  isDataLoaded: boolean,
  similarFilms: Film[],
  authorizationStatus: string,
  filmCardsCount: number,
  film: Film | null,
  favorite: Film[],
  reviews: Review[],
  isDataSending: boolean,
};
