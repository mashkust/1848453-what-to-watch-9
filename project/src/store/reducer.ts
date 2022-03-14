import {createReducer} from '@reduxjs/toolkit';
import {setGenre,loadPromoFilm,loadFilms} from './action';
import type {Film} from '../types/types';
import { DEFAULT_GENRE } from '../const';

type InitialState = {
  activeGenre: string,
  films: Film[],
  promoFilm: Film | object ,
  isDataLoaded: boolean,
}

const initialState: InitialState = {
  activeGenre: DEFAULT_GENRE,
  films: [],
  promoFilm: {},
  isDataLoaded: false,
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
    });
});

export {reducer};
