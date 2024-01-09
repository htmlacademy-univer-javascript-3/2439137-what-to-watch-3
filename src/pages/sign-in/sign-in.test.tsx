import { AnyAction } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { SignIn } from './sign-in.tsx';
import { withHistory, withStore } from '../../utils/mocks-component.tsx';
import { extractActionsTypes, makeFakeStore } from '../../utils/mocks.ts';
import { App } from '../../components/app/app.tsx';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { APIRoute } from '../../services/const.ts';
import { loginAction } from '../../store/api-actions.ts';
import { createMemoryHistory, MemoryHistory } from 'history';
import { FetchUserData } from '../../types/fetch-user-data.ts';

describe('Component: AuthScreen', () => {
  let mockHistory: MemoryHistory;
  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<SignIn />);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore(),
    );

    render(withStoreComponent);

    expect(
      screen.getByTestId('user-block__header__sign-in'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const fakeUser: FetchUserData = {
      email: 'test@test.ru',
      password: '123456',
    };
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const withHistoryComponent = withHistory(<SignIn />);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore(),
    );

    render(withStoreComponent);
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      fakeUser.email,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      fakeUser.password,
    );

    expect(screen.getByDisplayValue(fakeUser.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(fakeUser.password)).toBeInTheDocument();
  });

  it('should render correctly redirect when user sent correctly login and password', async () => {
    const fakeUser: FetchUserData = {
      email: 'test@test.ru',
      password: '123456',
    };
    const fakeServerReplay = { token: 'secret' };
    const store = makeFakeStore({
      USER: {
        authorizationStatus: {
          data: AuthorizationStatus.NoAuth,
          error: null,
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
      },
    });
    const withHistoryComponent = withHistory(<App />, mockHistory);
    mockHistory.push(AppRoute.SignIn);

    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      withHistoryComponent,
      store,
    );

    render(withStoreComponent);

    mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
    expect(screen.getByRole('button')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button'));
    await Promise.all([mockStore.dispatch(loginAction(fakeUser) as never as AnyAction)]);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.fulfilled.type,
    ]);
  });
});
