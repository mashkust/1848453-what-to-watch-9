import {createAction} from '@reduxjs/toolkit';
import type {Film} from '../types/types';
import {AuthorizationStatus} from '../const';

export const setGenre = createAction<string>('main/setGenre');

export const loadFilms = createAction<Film[]>('data/loadFilms');

export const loadPromoFilm = createAction<Film>('data/loadPromoFilm');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
