//React libraries
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Switch, Route } from 'react-router';
import { Provider } from 'react-redux';
import { Stack, List } from 'immutable';
import Root from './App/root.container';
import { setState } from './App/app.actions';
import { enqueue } from './Player/player.actions';
import { configureStore, history } from './configureStore';

//Axios for Ajax
import Axios from 'axios';

const client_id = '2f98992c40b8edf17423d93bda2e04ab';


function prepareUrl(url) {
 return `${url}?client_id=${client_id}`
}

async function loadPlaylist() {
  try {
    const response = await Axios.get(`https://api.soundcloud.com/tracks?client_id=${client_id}`);

    for (var track in response.data) {
      if (response.data.hasOwnProperty(track)) {
        response.data[track].stream_url = prepareUrl(response.data[track].stream_url);
      }
    }

    return response.data;
  } catch (e) {
    console.log(e);
  }
};

(async () => {
  const tracks = await loadPlaylist();
  const store = configureStore();

  store.dispatch(setState({
    playStatus: 'STOPPED',
    tracks: tracks,
    history: Stack(),
    queue: List(),
  }));

  store.dispatch(enqueue(List(tracks)));

  render(
    <Root store={store} history={history} />,
    document.getElementById('root')
  );
})();
