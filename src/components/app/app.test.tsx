import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AuthorizationStatus, AppRoute } from '../../const';
import App from './app';
import { makeFakeStore } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mocks-component.tsx';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "PromoFilm" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByTestId('promo_film-card__title')).toBeInTheDocument();
    expect(screen.getByTestId('promo_film-card__title').textContent).toBe(
      fakeStore.PROMO_FILM.data?.name,
    );
  });

  it('should render "AuthScreen" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore(),
    );
    mockHistory.push(AppRoute.SignIn);

    render(withStoreComponent);

    expect(
      screen.getByTestId('user-block__header__sign-in'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "AuthScreen" when user navigate to "/login" not auth', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore(),
    );
    mockHistory.push(AppRoute.MyList);

    render(withStoreComponent);

    expect(
      screen.getByTestId('user-block__header__sign-in'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "MyList" when user navigate to "/mylist"', () => {
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
    mockHistory.push(AppRoute.MyList);

    render(withStoreComponent);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByTestId('catalog__films').children.length).toBe(fakeStore.FAVORITE_FILMS.data.length);
  });

  it('should render "MoviePage" when user navigate to "/films/{id}" not auth', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      fakeStore
    );
    mockHistory.push(AppRoute.Film(fakeStore.FILM.film.data?.id));

    render(withStoreComponent);

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });

  it('should render "MoviePage" when user navigate to "/films/{id}" auth', () => {
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
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      fakeStore
    );
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

  it('should render "Player" when user navigate to "/player/{id}"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      fakeStore
    );
    mockHistory.push(AppRoute.Player(fakeStore.FILM.film.data?.id));

    render(withStoreComponent);
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByTestId('player__name').textContent).toBe(fakeStore.FILM.film.data?.name);
  });

  it('should render "AddReview" when user navigate to "/films/{id}/review"', () => {
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
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      fakeStore
    );
    mockHistory.push(AppRoute.AddReview(fakeStore.FILM.film.data?.id));

    render(withStoreComponent);
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore(),
    );
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Ты как сюда попал.')).toBeInTheDocument();
  });
});
