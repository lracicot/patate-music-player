// React libraries
import React from 'react';
import { render } from 'react-dom';
import { Stack, List } from 'immutable';

import Root from './App/root.container';
import { setState } from './App/app.actions';
import { enqueue } from './Player/player.actions';
import { configureStore, history } from './configureStore';

import SoundCloudProxy from './../src/model/SoundCloudProxy';
import SpotifyProxy from './../src/model/SpotifyProxy';

(async () => {
  const soundCloudProxy = new SoundCloudProxy();
  const spotifyProxy = new SpotifyProxy();
  const sources = [soundCloudProxy, spotifyProxy];

  // TODO:: Find a way to move it somewhere else
  const tracks = await soundCloudProxy.loadRandomPlaylist();

  const store = configureStore();

  store.dispatch(setState({
    playStatus: 'STOPPED',
    tracks,
    history: Stack(),
    queue: List(),
    sources: List(sources),
  }));

  store.dispatch(enqueue(List(tracks)));
  render(
    <Root store={store} history={history} />,
    document.getElementById('root'),
  );
})();
