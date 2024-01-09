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
  reducers: {
    clear: (state) => {
      state.userData.error = {
        property: [],
        messages: [],
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.authorizationStatus = {
          ...state.authorizationStatus,
          loading: true,
        };
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = {
          ...state.authorizationStatus,
          loading: false,
          data: AuthorizationStatus.Auth,
        };
        state.userData = {
          ...state.userData,
          data: action.payload,
        };
      })
      .addCase(checkAuthAction.rejected, (state, value) => {
        state.authorizationStatus = {
          data: AuthorizationStatus.Unknown,
          loading: false,
          error:
            value.error && value.error.message ? value.error.message : null,
        };
      })
      .addCase(loginAction.pending, (state) => {
        state.userData = {
          ...state.userData,
          loading: true,
        };
      })
      .addCase(loginAction.fulfilled, (state, action) => {
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
        state.authorizationStatus = {
          loading: false,
          error: null,
          data: AuthorizationStatus.NoAuth,
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

export const { clear } = userProcess.actions;
