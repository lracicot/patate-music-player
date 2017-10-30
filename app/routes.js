import React from 'react';
import { Route, Switch } from 'react-router';
import App from './App/app.container';
import { PlayerContainer } from './Player/player.container';
import { SourceListContainer } from './SourceList/sourcelist.container';

export default () => (
  <App>
    <Switch>
      <Route exact path="/" component={PlayerContainer} />
      <Route exact path="/sources" component={SourceListContainer} />
      <Route path="*" component={PlayerContainer} />
    </Switch>
  </App>
);
