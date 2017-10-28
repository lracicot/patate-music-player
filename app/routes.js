import React from 'react';
import { Switch, Route } from 'react-router';
import App from './App/app.container';
import { LayoutContainer } from './Layout/layout.container';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={LayoutContainer} />
    </Switch>
  </App>
);
