import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';

type RootType = {
  store: {},
  history: {}
};

/**
 * Root - Render the root of the application
 *
 * @param {RootType} rootContainer         The root data to hold
 *
 * @return {ReactComponent} The rendered compoent
 */
export default function Root({ store, history }: RootType) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
}
