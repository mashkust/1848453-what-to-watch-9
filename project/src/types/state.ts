import {store} from '../store/store';
import type {Film} from './types';

export type State = {
  activeGenre: string,
  films: Film[],
  promoFilm: Film | object ,
  isDataLoaded: boolean,
};

export type AppDispatch = typeof store.dispatch;
