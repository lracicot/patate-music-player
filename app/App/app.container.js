import React, { Component } from 'react';
import type { Children } from 'react';
import { Grid } from 'semantic-ui-react';

import { MainMenuContainer } from '../Layout/MainMenu.container';


/**
  * App - The main application component
  * @extends Component
  */
export default class App extends Component {
  props: {
    children: Children
  };

  /**
   * render - Render the component
   *
   * @return {ReactComponent} Return the rendered component
   */
  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <MainMenuContainer />
          </Grid.Column>
          <Grid.Column width={12}>
            {this.props.children}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
