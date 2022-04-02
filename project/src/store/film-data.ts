import {createSlice} from '@reduxjs/toolkit';
import { FilmData } from '../types/types';
import {DEFAULT_GENRE, AuthorizationStatus, FILM_CARDS_COUNT, NameSpace} from '../const';

const initialState: FilmData = {
  activeGenre: DEFAULT_GENRE,
  films: [],
  promoFilm: {},
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  filmCardsCount: FILM_CARDS_COUNT,
  film: null,
  favorite: [],
  similarFilms: [],
  reviews: [],
  isDataSending: false,
};

export interface SetActiveFilmAction {
  type: string,
  payload: {
    id: number,
    isMouseOver: boolean
  }
}

export const filmData = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    loadFilms: (state, action) => {
      state.films = action.payload;
      state.isDataLoaded = true;
    },
    loadPromoFilm: (state, action) => {
      state.promoFilm = action.payload;
    },
    loadFilm: (state, action) => {
      state.film = action.payload;
    },
    loadSimilarFilms: (state, action) => {
      state.similarFilms = action.payload;
    },
    loadFavorite: (state, action) => {
      state.favorite = action.payload;
    },
    changeFavoriteStatus: (state, action) => {
      state.isDataSending = action.payload;
    },
    loadReviews: (state, action) => {
      state.reviews = action.payload;
    },
    sendReview: (state, action) => {
      state.isDataSending = action.payload;
    },
    setActiveFilm: (state, action:SetActiveFilmAction) => {
      const { isMouseOver, id } = action.payload;
      state.films.map((film) => {film.isActive =  isMouseOver ? false : film.id ===id; return film; });
    },
  },
});

export const {
  loadFilms,
  loadFilm,
  loadPromoFilm,
  loadSimilarFilms,
  loadReviews,
  sendReview,
  setActiveFilm,
  loadFavorite,
  changeFavoriteStatus,
} = filmData.actions;
