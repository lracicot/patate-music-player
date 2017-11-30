import React from 'react';
import { Route, Switch } from 'react-router';
import App from './App/app.container';
import { PlayerContainer } from './Player/player.container';
import { SourceListContainer } from './SourceList/sourcelist.container';
import { PlaylistsListContainer } from './PlaylistsList/playlistslist.container';
import { LoginContainer } from './Login/login.container';

/**
 * Routes - Render the appplication and manage the routes
 *
 * @return {App} The application
 */
export default () => (
  <App>
    <Switch>
      <Route exact path="/" component={LoginContainer} />
      <Route exact path="/player" component={PlayerContainer} />
      <Route exact path="/sources" component={SourceListContainer} />
      <Route exact path="/playlists" component={PlaylistsListContainer} />
      <Route exact path="/login" component={LoginContainer} />
      <Route path="*" component={LoginContainer} />
    </Switch>
  </App>
);
