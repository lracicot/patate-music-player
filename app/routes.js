import React from 'react';
import { Switch, Route } from 'react-router';
import App from './App/app.container';
import { PlayerContainer } from './Player/player.container';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={ PlayerContainer } />
    </Switch>
  </App>
);
