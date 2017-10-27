// React libraries
import React from 'react';
import { render } from 'react-dom';
import { Stack, List } from 'immutable';

import Root from './App/root.container';
import { setState } from './App/app.actions';
import { enqueue } from './Player/player.actions';
import { configureStore, history } from './configureStore';
import SoundCloudProxy from './../src/model/SoundCloudProxy';

(async () => {
  const proxy = new SoundCloudProxy();
  const tracks = await proxy.loadRandomPlaylist();
  const store = configureStore();

  store.dispatch(setState({
    playStatus: 'STOPPED',
    tracks,
    history: Stack(),
    queue: List(),
  }));

  store.dispatch(enqueue(List(tracks)));

  render(
    <Root store={store} history={history} />,
    document.getElementById('root')
  );
})();
