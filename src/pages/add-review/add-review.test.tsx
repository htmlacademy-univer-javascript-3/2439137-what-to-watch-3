import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mocks-component.tsx';
import { App } from '../../components/app/app.tsx';
import { makeFakeStore } from '../../utils/mocks.ts';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { createMemoryHistory, MemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

describe('Component: AddReview', () => {
  let mockHistory: MemoryHistory;
  const reviewTextTestId = 'review-text';
  const reviewRating5TestId = 'star-5';
  const shortTest = 'q'.repeat(49);
  const normalTest = 'q'.repeat(50);

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });
  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeStore = makeFakeStore({
      USER: {
        authorizationStatus: {
          status: AuthorizationStatus.Auth,
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
    mockHistory.push(AppRoute.AddReview(fakeStore.FILM.film.film?.id));

    render(withStoreComponent);
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
  });

  it('should render disabled post button when not valid text review, short test', async () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeStore = makeFakeStore({
      USER: {
        authorizationStatus: {
          status: AuthorizationStatus.Auth,
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
    mockHistory.push(AppRoute.AddReview(fakeStore.FILM.film.film?.id));

    render(withStoreComponent);
    const postButton = screen.getByRole('button');
    const textConteiner = screen.getByTestId(reviewTextTestId);
    await userEvent.click(screen.getByTestId(reviewRating5TestId));

    await userEvent.type(textConteiner, shortTest);
    expect(postButton).toBeDisabled();
  });

  it('should render disabled post button when not valid rating review', async () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeStore = makeFakeStore({
      USER: {
        authorizationStatus: {
          status: AuthorizationStatus.Auth,
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
    mockHistory.push(AppRoute.AddReview(fakeStore.FILM.film.film?.id));

    render(withStoreComponent);
    const postButton = screen.getByRole('button');
    await userEvent.type(screen.getByTestId('review-text'), normalTest);

    expect(postButton).toBeDisabled();
  });

  it('should render enabled post button when valid review', async () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeStore = makeFakeStore({
      USER: {
        authorizationStatus: {
          status: AuthorizationStatus.Auth,
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
    mockHistory.push(AppRoute.AddReview(fakeStore.FILM.film.film?.id));

    render(withStoreComponent);
    const postButton = screen.getByRole('button');
    const textContainer = screen.getByTestId(reviewTextTestId);

    await userEvent.click(screen.getByTestId(reviewRating5TestId));
    await userEvent.type(textContainer, normalTest);
    expect(postButton).not.toBeDisabled();
  });
});
