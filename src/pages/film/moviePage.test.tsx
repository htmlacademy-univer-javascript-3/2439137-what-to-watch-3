import { render, screen } from '@testing-library/react';
import { extractActionsTypes, makeFakeStore } from '../../utils/mocks.ts';
import { withHistory, withStore } from '../../utils/mocks-component.tsx';
import App from '../../components/app/app.tsx';
import { createMemoryHistory, MemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { APIRoute } from '../../services/const.ts';
import userEvent from '@testing-library/user-event';
import { fetchChangeStatusFilmFavoriteAction } from '../../store/api-actions.ts';
import { expect } from 'vitest';

describe('Component: MoviePage', () => {
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
    mockHistory.push(AppRoute.Film(fakeStore.FILM.film.data?.id));

    render(withStoreComponent);

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });

  it('should dispatch "fetchChangeStatusFilmFavoriteAction" when user clicked "FavoriteAction" button', async () => {
    const store = makeFakeStore({
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
    const withHistoryComponent = withHistory(<App />, mockHistory);
    mockHistory.push(AppRoute.Film(store.FILM.film.data?.id));

    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      withHistoryComponent,
      store,
    );
    render(withStoreComponent);
    mockAxiosAdapter
      .onPost(
        `${APIRoute.FilmFavorite}/${store.FILM.film.data?.id || '0'}/${1}`,
      )
      .reply(200, store);
    expect(screen.getByRole('button')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button'));

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions[actions.length - 1]).toBe(
      fetchChangeStatusFilmFavoriteAction.fulfilled.type,
    );
  });
});
