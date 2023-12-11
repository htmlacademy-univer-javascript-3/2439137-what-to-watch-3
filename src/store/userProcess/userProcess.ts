import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const.ts';
import { UserProcess } from '../../types/state.ts';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions.ts';
import { errorFormat } from './utils.ts';

const initialState: UserProcess = {
  authorizationStatus: {
    error: null,
    data: AuthorizationStatus.Unknown,
    loading: false,
  },
  userData: {
    error: {
      property: [],
      messages: [],
    },
    data: null,
    loading: false,
  },
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.authorizationStatus = {
          ...state.authorizationStatus,
          loading: true,
        };
      })
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = {
          ...state.authorizationStatus,
          loading: false,
          data: AuthorizationStatus.Auth,
        };
      })
      .addCase(checkAuthAction.rejected, (state, value) => {
        state.authorizationStatus = {
          data: AuthorizationStatus.Unknown,
          loading: false,
          error: value.error.message ?? null,
        };
      })
      .addCase(loginAction.pending, (state) => {
        console.log('1');
        state.userData = {
          ...state.userData,
          loading: true,
        };
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        console.log('2');
        state.userData = {
          ...state.userData,
          loading: false,
          data: action.payload,
        };
        state.authorizationStatus = {
          loading: false,
          error: null,
          data: AuthorizationStatus.Auth,
        };
      })
      .addCase(loginAction.rejected, (state, value) => {
        state.userData = {
          ...state.userData,
          loading: false,
          error: errorFormat(value.payload),
        };
      })
      .addCase(logoutAction.pending, (state) => {
        state.authorizationStatus = {
          ...state.authorizationStatus,
          loading: true,
        };
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = {
          ...state.authorizationStatus,
          loading: false,
          data: AuthorizationStatus.NoAuth,
        };
        state.userData = {
          ...state.userData,
          data: null,
        };
      })
      .addCase(logoutAction.rejected, (state, value) => {
        state.authorizationStatus = {
          ...state.authorizationStatus,
          loading: false,
          error: value.error.message ?? null,
        };
      });
  },
});
