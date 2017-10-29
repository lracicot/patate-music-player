import React from 'react';
import { Route } from 'react-router';
import App from './App/app.container';
import { PlayerContainer } from './Player/player.container';
import { SourceListContainer } from './SourceList/sourcelist.container';
import ConnectedSwitch from './connectedSwitch';

export default () => (
  <App>
    <ConnectedSwitch>
      <Route path="/" component={PlayerContainer} />
      <Route path="/sources" component={SourceListContainer} />
    </ConnectedSwitch>
  </App>
);
