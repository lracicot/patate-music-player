// React libraries
import React from 'react';
import { render } from 'react-dom';
import { Stack, List } from 'immutable';

import Root from './App/root.container';
import { setState } from './App/app.actions';
import { configureStore, history } from './configureStore';

import SoundCloudProxy from './../src/model/SoundCloudProxy';
import SpotifyProxy from './../src/model/SpotifyProxy';
import JamendoProxy from './../src/model/JamendoProxy';

(async () => {
  const soundCloudProxy = new SoundCloudProxy();
  const spotifyProxy = new SpotifyProxy();
  const jamendoProxy = new JamendoProxy();
  const sources = [soundCloudProxy, spotifyProxy, jamendoProxy];

  const store = configureStore();

  store.dispatch(setState({
    playStatus: 'STOPPED',
    tracks: List(),
    history: Stack(),
    queue: List(),
    sources: List(sources),
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
