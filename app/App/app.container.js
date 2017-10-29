import React, { PureComponent } from 'react';
import type { Children } from 'react';

export default class App extends PureComponent {
  props: {
    children: Children
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
