import { render, screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import {makeFakeStore} from '../../utils/mocks.ts';
import { withHistory, withStore } from '../../utils/mocks-component.tsx';
import { App } from '../../components/app/app.tsx';
import {AuthorizationStatus} from '../../const.ts';

describe('Component: Empty list', () => {
  let mockHistory: MemoryHistory;
  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correct', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeStore = makeFakeStore({
      USER: {
        authorizationStatus: {
          data: AuthorizationStatus.Auth,
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
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);
    render(withStoreComponent);

    const header = screen.getByTestId('header');
    const footer = screen.getByTestId('footer');

    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });
});
