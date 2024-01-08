import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { State } from '../types/state';
import {
  checkAuthAction,
  fetchChangeStatusFilmFavoriteAction,
  fetchCommentsFilmAction,
  fetchFavoriteFilmsAction,
  fetchFilmAction,
  fetchFilmsAction,
  fetchPromoFilmAction,
  fetchSimilarFilmsFilmAction,
  loginAction,
  logoutAction,
} from './api-actions';
import { createAPI } from '../services/api';
import {
  extractActionsTypes,
  testCommentsFilm,
  testFavoriteFilms,
  testFilm,
  testFilms,
  testPromoFilm,
  testSimilarFilms,
} from '../utils/mocks.ts';
import { APIRoute } from '../services/const.ts';
import { FetchUserData } from '../types/fetchUserData.ts';
import * as tokenStorage from '../services/token';

describe('async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middlewares = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof axios, Action>
  >(middlewares);
  let store: ReturnType<typeof mockStoreCreator>;
  const film = testFilm;
  const films = testFilms;
  const favoriteFilms = testFavoriteFilms;
  const similarFilms = testSimilarFilms;
  const promoFilm = testPromoFilm;
  const commentsFilm = testCommentsFilm;
  const fakeFilmId = '0';

  beforeEach(() => {
    store = mockStoreCreator({
      FAVORITE_FILMS: undefined,
      FILM: undefined,
      FILMS: undefined,
      PROMO_FILM: undefined,
      USER: undefined,
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending" and "loginAction.fulfilled"  when server response 200', async () => {
      const fakeUser: FetchUserData = {
        email: 'test@test.ru',
        password: '123456',
      };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: FetchUserData = {
        email: 'test@test.ru',
        password: '123456',
      };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('fetchFilmsAction', () => {
    it('should dispatch "fetchFilmsAction.pending", "fetchFilmsAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Films).reply(200, films);

      await store.dispatch(fetchFilmsAction());

      const emittedActions = store.getActions();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmsActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchFilmsAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.fulfilled.type,
      ]);

      expect(fetchFilmsActionFulfilled.payload).toEqual(films);
    });

    it('should dispatch "fetchFilmsAction.pending", "fetchFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Films).reply(400, []);

      await store.dispatch(fetchFilmsAction());
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.rejected.type,
      ]);
    });
  });

  describe('fetchFilmAction', () => {
    it('should dispatch "fetchFilmAction.pending", "fetchFilmAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter
        .onGet(`${APIRoute.Films}/${fakeFilmId}`)
        .reply(200, film);

      await store.dispatch(fetchFilmAction({ filmId: fakeFilmId }));

      const emittedActions = store.getActions();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchFilmAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.fulfilled.type,
      ]);

      expect(fetchFilmActionFulfilled.payload).toEqual(film);
    });

    it('should dispatch "fetchFilmAction.pending", "fetchFilmAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${fakeFilmId}`).reply(400, []);

      await store.dispatch(fetchFilmAction({ filmId: fakeFilmId }));
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.rejected.type,
      ]);
    });
  });

  describe('fetchCommentsFilmAction', () => {
    it('should dispatch "fetchCommentsFilmAction.pending", "fetchCommentsFilmAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter
        .onGet(`${APIRoute.FilmComments}/${fakeFilmId}`)
        .reply(200, commentsFilm);

      await store.dispatch(fetchCommentsFilmAction({ filmId: fakeFilmId }));

      const emittedActions = store.getActions();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCommentsFilmActionFulfilled = emittedActions.at(
        1,
      ) as ReturnType<typeof fetchCommentsFilmAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCommentsFilmAction.pending.type,
        fetchCommentsFilmAction.fulfilled.type,
      ]);

      expect(fetchCommentsFilmActionFulfilled.payload).toEqual(commentsFilm);
    });

    it('should dispatch "fetchCommentsFilmAction.pending", "fetchCommentsFilmAction.rejected" when server response 400', async () => {
      mockAxiosAdapter
        .onGet(`${APIRoute.FilmComments}/${fakeFilmId}`)
        .reply(400, []);

      await store.dispatch(fetchCommentsFilmAction({ filmId: fakeFilmId }));
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCommentsFilmAction.pending.type,
        fetchCommentsFilmAction.rejected.type,
      ]);
    });
  });

  describe('fetchSimilarFilmsFilmAction', () => {
    it('should dispatch "fetchSimilarFilmsFilmAction.pending", "fetchSimilarFilmsFilmAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter
        .onGet(`${APIRoute.Films}/${fakeFilmId}/similar`)
        .reply(200, similarFilms);

      await store.dispatch(fetchSimilarFilmsFilmAction({ filmId: fakeFilmId }));

      const emittedActions = store.getActions();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarFilmsFilmActionFulfilled = emittedActions.at(
        1,
      ) as ReturnType<typeof fetchSimilarFilmsFilmAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarFilmsFilmAction.pending.type,
        fetchSimilarFilmsFilmAction.fulfilled.type,
      ]);

      expect(fetchSimilarFilmsFilmActionFulfilled.payload).toEqual(
        similarFilms,
      );
    });

    it('should dispatch "fetchSimilarFilmsFilmAction.pending", "fetchSimilarFilmsFilmAction.rejected" when server response 400', async () => {
      mockAxiosAdapter
        .onGet(`${APIRoute.Films}/${fakeFilmId}/similar`)
        .reply(400, []);

      await store.dispatch(fetchSimilarFilmsFilmAction({ filmId: fakeFilmId }));
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilarFilmsFilmAction.pending.type,
        fetchSimilarFilmsFilmAction.rejected.type,
      ]);
    });
  });

  describe('fetchPromoFilmAction', () => {
    it('should dispatch "fetchPromoFilmAction.pending", "fetchPromoFilmAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.FilmPromo).reply(200, promoFilm);

      await store.dispatch(fetchPromoFilmAction());

      const emittedActions = store.getActions();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromoFilmActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchPromoFilmAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.fulfilled.type,
      ]);

      expect(fetchPromoFilmActionFulfilled.payload).toEqual(promoFilm);
    });

    it('should dispatch "fetchPromoFilmAction.pending", "fetchPromoFilmAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.FilmPromo).reply(400, null);

      await store.dispatch(fetchPromoFilmAction());
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoriteFilmsAction', () => {
    it('should dispatch "fetchFavoriteFilmsAction.pending", "fetchFavoriteFilmsAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.FilmFavorite).reply(200, favoriteFilms);

      await store.dispatch(fetchFavoriteFilmsAction());

      const emittedActions = store.getActions();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoriteFilmsActionFulfilled = emittedActions.at(
        1,
      ) as ReturnType<typeof fetchFavoriteFilmsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteFilmsAction.pending.type,
        fetchFavoriteFilmsAction.fulfilled.type,
      ]);

      expect(fetchFavoriteFilmsActionFulfilled.payload).toEqual(favoriteFilms);
    });

    it('should dispatch "fetchFavoriteFilmsAction.pending", "fetchFavoriteFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.FilmFavorite).reply(400, []);

      await store.dispatch(fetchFavoriteFilmsAction());
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteFilmsAction.pending.type,
        fetchFavoriteFilmsAction.rejected.type,
      ]);
    });
  });

  describe('fetchChangeStatusFilmFavoriteAction', () => {
    it('should dispatch "fetchChangeStatusFilmFavoriteAction.pending", "fetchChangeStatusFilmFavoriteAction.fulfilled", when server response 200', async () => {
      mockAxiosAdapter
        .onPost(`${APIRoute.FilmFavorite}/${fakeFilmId}/${0}`)
        .reply(200, favoriteFilms);

      await store.dispatch(
        fetchChangeStatusFilmFavoriteAction({ filmId: fakeFilmId, status: 0 }),
      );

      const emittedActions = store.getActions();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchChangeStatusFilmFavoriteActionFulfilled = emittedActions.at(
        1,
      ) as ReturnType<typeof fetchChangeStatusFilmFavoriteAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchChangeStatusFilmFavoriteAction.pending.type,
        fetchChangeStatusFilmFavoriteAction.fulfilled.type,
      ]);

      expect(fetchChangeStatusFilmFavoriteActionFulfilled.payload).toEqual(
        favoriteFilms,
      );
    });

    it('should dispatch "fetchChangeStatusFilmFavoriteAction.pending", "fetchChangeStatusFilmFavoriteAction.rejected" when server response 400', async () => {
      mockAxiosAdapter
        .onPost(`${APIRoute.FilmFavorite}/${fakeFilmId}/${0}`)
        .reply(400, []);

      await store.dispatch(
        fetchChangeStatusFilmFavoriteAction({ filmId: fakeFilmId, status: 0 }),
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchChangeStatusFilmFavoriteAction.pending.type,
        fetchChangeStatusFilmFavoriteAction.rejected.type,
      ]);
    });
  });
});
