import {createAsyncThunk} from '@reduxjs/toolkit';
import {api,store} from './index';

import {Film} from '../types/types';

import {
  loadFilms,
  requireAuthorization
} from './action';

import {saveToken,dropToken} from '../services/token';

import {APIRoute,AuthorizationStatus} from '../const';

import {UserData, AuthData} from '../types/types';

export const fetchFilmsAction = createAsyncThunk(
  'data/fetchFilms',
  async () => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    store.dispatch(loadFilms(data));
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    await api.get(APIRoute.Login);
    store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({login: email, password}: AuthData) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
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
