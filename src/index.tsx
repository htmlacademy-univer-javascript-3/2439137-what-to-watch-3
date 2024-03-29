import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/app/app.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction, fetchFilmsAction } from './store/api-actions.ts';
import { HistoryRouter } from './components/history-route/history-route.tsx';
import browserHistory from './browserHistory.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
