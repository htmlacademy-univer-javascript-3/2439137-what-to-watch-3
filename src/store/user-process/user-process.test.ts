import { AuthorizationStatus } from '../../const.ts';
import { UserProcess } from '../../types/state.ts';
import { userProcess } from './user-process.ts';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions.ts';
import { testUser } from '../../utils/mocks.ts';

describe('userProcess', () => {
  let state: UserProcess;
  beforeEach(() => {
    state = {
      authorizationStatus: {
        error: null,
        status: AuthorizationStatus.Unknown,
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
  });

  it('should return initial state with empty action', () => {
    const action = { type: '' };
    expect(userProcess.reducer(undefined, action)).toEqual(state);
  });

  describe('check authorization', () => {
    it('should update authorization status to "AUTH" if checkAuthAction fulfilled', () => {
      expect(
        userProcess.reducer(state, {
          type: checkAuthAction.fulfilled.type,
          payload: testUser,
        }),
      ).toMatchObject({
        authorizationStatus: {
          error: null,
          status: AuthorizationStatus.Auth,
          loading: false,
        },
        userData: {
          error: {
            property: [],
            messages: [],
          },
          data: testUser,
          loading: false,
        },
      });
    });
    it('should update authorization status to "UNKNOWN" if checkAuthAction rejected', () => {
      expect(
        userProcess.reducer(state, {
          type: checkAuthAction.rejected.type,
          error: { message: 'error' },
        }),
      ).toMatchObject({
        authorizationStatus: {
          error: 'error',
          status: AuthorizationStatus.Unknown,
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
      });
    });
  });

  describe('login', () => {
    it('should update authorization status to "AUTH" and user data if loginAction fulfilled', () => {
      expect(
        userProcess.reducer(state, {
          type: loginAction.fulfilled.type,
          payload: testUser,
        }),
      ).toMatchObject({
        authorizationStatus: {
          error: null,
          status: AuthorizationStatus.Auth,
          loading: false,
        },
        userData: {
          error: {
            property: [],
            messages: [],
          },
          data: testUser,
          loading: false,
        },
      });
    });
    it('should update authorization status to "NO_AUTH" if loginAction rejected', () => {
      expect(
        userProcess.reducer(state, {
          type: loginAction.rejected.type,
          payload: [
            {
              property: 'password',
              messages: [
                'password must be longer than or equal to 3 characters',
              ],
            },
          ],
        }),
      ).toMatchObject({
        authorizationStatus: {
          error: null,
          status: AuthorizationStatus.NoAuth,
          loading: false,
        },
        userData: {
          error: {
            property: ['password'],
            messages: ['password must be longer than or equal to 3 characters'],
          },
          data: null,
          loading: false,
        },
      });
    });
  });

  describe('logout', () => {
    it('should update authorization status to "NO_AUTH" and user data if logoutAction fulfilled', () => {
      state.authorizationStatus.status = AuthorizationStatus.Auth;
      state.userData.data = testUser;
      expect(
        userProcess.reducer(state, {
          type: logoutAction.fulfilled.type,
        }),
      ).toMatchObject({
        authorizationStatus: {
          error: null,
          status: AuthorizationStatus.NoAuth,
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
      });
    });
    it('should add error if logoutAction rejected', () => {
      state.authorizationStatus.status = AuthorizationStatus.Auth;
      state.userData.data = testUser;
      expect(
        userProcess.reducer(state, {
          type: logoutAction.rejected.type,
          error: { message: 'error' },
        }),
      ).toMatchObject({
        authorizationStatus: {
          error: 'error',
          status: AuthorizationStatus.Auth,
          loading: false,
        },
        userData: {
          error: {
            property: [],
            messages: [],
          },
          data: testUser,
          loading: false,
        },
      });
    });
  });
});
