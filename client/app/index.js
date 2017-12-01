// React libraries
import React from 'react';
import { render } from 'react-dom';
import { Stack, List } from 'immutable';
import Axios from 'axios';

import Root from './App/root.container';
import { setState } from './App/app.actions';
import { configureStore, history } from './configureStore';

/**
  * Index - Open the application
  */
(async () => {
  const { data } = await Axios.get('http://localhost:3002/api/getAvailableSources');

  const store = configureStore();

  store.dispatch(setState({
    playStatus: 'STOPPED',
    tracks: List(),
    history: Stack(),
    queue: List(),
    sources: List(data.sources),
    connectedSources: [],
    playlistsFound: List(),
  }));

  render(
    <Root store={store} history={history} />,
    document.getElementById('root'),
  );


  if (module.hot) {
    module.hot.accept('./containers/Root', () => {
      const NextRoot = require('./App/root.container'); // eslint-disable-line global-require
      render(
        <NextRoot store={store} history={history} />,
        document.getElementById('root'),
      );
    });
  }
})();
