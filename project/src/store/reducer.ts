import {createReducer} from '@reduxjs/toolkit';
import {setGenre,loadPromoFilm,loadFilms,requireAuthorization} from './action';
import type {Film} from '../types/types';
import {DEFAULT_GENRE, AuthorizationStatus} from '../const';

type InitialState = {
  activeGenre: string,
  films: Film[],
  promoFilm: Film | object ,
  isDataLoaded: boolean,
  authorizationStatus: string
}

const initialState: InitialState = {
  activeGenre: DEFAULT_GENRE,
  films: [],
  promoFilm: {},
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
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
    });
});

export {reducer};
