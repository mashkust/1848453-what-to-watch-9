import {createSlice} from '@reduxjs/toolkit';

import {NameSpace,AuthorizationStatus} from '../const';

import {UserProcess} from '../types/types';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {},
  errorText: null,
};

export interface SetErrorTextAction {
  type: string;
  payload: {
    text: string | null;
  }

}

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
    setErrorText: (state, action:SetErrorTextAction ) => {
      state.errorText = action.payload.text;
    },
  },
});

export const {requireAuthorization, loadUserData, setErrorText} = userProcess.actions;
