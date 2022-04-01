import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, store } from './index';
import { Film, NewReview, Review } from '../types/types';
import { changeFavoriteStatus, loadFavorite, loadFilm, loadFilms, loadPromoFilm, loadReviews, loadSimilarFilms, sendReview } from './film-data';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus } from '../const';
import { loadUserData, requireAuthorization } from './user-process';
import { UserData, AuthData } from '../types/types';
import {errorHandle} from '../services/error-handle';


export const fetchFilmsAction = createAsyncThunk(
  'data/fetchFilms',
  async () => {
    try {
      const { data } = await api.get<Film[]>(APIRoute.Films);
      store.dispatch(loadFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFilmAction = createAsyncThunk(
  'data/fetchFilm',
  async (filmId: number) => {
    try {
      const {data} = await api.get<Film>(`${APIRoute.Film}${filmId}`);
      store.dispatch(loadFilm(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchReviewsAction = createAsyncThunk(
  'data/fetchReviews',
  async (filmId: number) => {
    try {
      const {data} = await api.get<Review[]>(`${APIRoute.Comments}${filmId}`);
      store.dispatch(loadReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({ login: email, password }: AuthData) => {
    try {
      const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user.logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchPromoFilmAction = createAsyncThunk(
  'data/fetchPromoFilm',
  async () => {
    try {
      const { data } = await api.get<Film>(APIRoute.PromoFilm);
      store.dispatch(loadPromoFilm(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk(
  'data/fetchSimilarFilms',
  async (filmId: number) => {
    try {
      const {data} = await api.get<Film[]>(`${APIRoute.SimilarFilms}${filmId}/similar`);
      store.dispatch(loadSimilarFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchUserData = createAsyncThunk(
  'data/fetchUserData',
  async () => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      store.dispatch(loadUserData(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFavoriteAction = createAsyncThunk(
  'data/fetchFavoriteFilms',
  async () => {
    try {
      const {data} = await api.get<Film[]>(APIRoute.Favorite);
      store.dispatch(loadFavorite(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const changeFavoriteAction = createAsyncThunk(
  'data/changeFavoriteFilmStatus',
  async ({filmId, status}: {filmId: number, status: number}) => {
    try {
      await api.post<Film>(`${APIRoute.Favorite}/${filmId}/${status}`);
      store.dispatch(fetchPromoFilmAction());
      store.dispatch(fetchFilmAction(filmId));
      store.dispatch(changeFavoriteStatus(false));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const sendReviewAction = createAsyncThunk(
  'data/sendNewReview',
  async ({filmId, comment, rating}: NewReview) => {
    try {
      await api.post<NewReview>(`${APIRoute.Comments}${filmId}`, {comment, rating});
      store.dispatch(sendReview(false));
    } catch (error) {
      errorHandle(error);
    }
  },
);


