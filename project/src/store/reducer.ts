import {createReducer} from '@reduxjs/toolkit';
import {setGenre,loadPromoFilm,loadFilms,requireAuthorization, incCountAction, resetCountAction} from './action';
import type {Film} from '../types/types';
import {DEFAULT_GENRE, AuthorizationStatus, FILM_CARDS_COUNT, FILM_CARDS_COUNT_STEP} from '../const';

type InitialState = {
  activeGenre: string,
  films: Film[],
  promoFilm: Film | object ,
  isDataLoaded: boolean,
  authorizationStatus: string,
  filmCardsCount: number,
}

const initialState: InitialState = {
  activeGenre: DEFAULT_GENRE,
  films: [],
  promoFilm: {},
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  filmCardsCount: FILM_CARDS_COUNT,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.activeGenre = action.payload;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(incCountAction, (state) => {
      state.filmCardsCount += FILM_CARDS_COUNT_STEP;
    })
    .addCase(resetCountAction, (state) => {
      state.filmCardsCount = FILM_CARDS_COUNT;
    });
});

export {reducer};
