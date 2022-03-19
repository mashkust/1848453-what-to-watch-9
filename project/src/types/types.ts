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
