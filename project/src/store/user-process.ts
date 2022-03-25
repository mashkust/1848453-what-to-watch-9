import {createSlice} from '@reduxjs/toolkit';

import {NameSpace,AuthorizationStatus} from '../const';

import {UserProcess} from '../types/types';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {},
};

export const userProcess = createSlice({
  name: NameSpace.user,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    loadUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {requireAuthorization, loadUserData} = userProcess.actions;
