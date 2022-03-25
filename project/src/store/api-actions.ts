import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, store } from './index';
import { Film, Review } from '../types/types';
import { loadFilm, loadFilms, loadPromoFilm, loadReviews, loadSimilarFilms } from './film-data';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus } from '../const';
import { requireAuthorization } from './user-process';
import { UserData, AuthData } from '../types/types';

export const fetchFilmsAction = createAsyncThunk(
  'data/fetchFilms',
  async () => {
    const { data } = await api.get<Film[]>(APIRoute.Films);
    store.dispatch(loadFilms(data));
  },
);

export const fetchFilmAction = createAsyncThunk(
  'data/fetchFilm',
  async (filmid: number) => {
    const {data} = await api.get<Film>(`${APIRoute.Film}${filmid}`);
    store.dispatch(loadFilm(data));
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    await api.get(APIRoute.Login);
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const fetchReviewsAction = createAsyncThunk(
  'data/fetchReviews',
  async (filmid: number) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Comments}${filmid}`);
    store.dispatch(loadReviews(data));
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({ login: email, password }: AuthData) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk(
  'user.logout',
  async () => {
    await api.delete(APIRoute.Logout);
    dropToken();
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const fetchPromoFilmAction = createAsyncThunk(
  'data/fetchPromoFilm',
  async () => {
    const { data } = await api.get<Film>(APIRoute.PromoFilm);
    store.dispatch(loadPromoFilm(data));
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk(
  'data/fetchSimilarFilms',
  async (filmid: number) => {
    const {data} = await api.get<Film[]>(`${APIRoute.SimilarFilms}${filmid}/similar`);
    store.dispatch(loadSimilarFilms(data));
  },
);
