import {store} from '../store/index';
import type {Film} from './types';

export type State = {
  activeGenre: string,
  films: Film[],
  promoFilm: Film | object ,
  isDataLoaded: boolean,
  authorizationStatus:string,
};

export type AppDispatch = typeof store.dispatch;
