import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import { SourceListContainer } from './../SourceList/sourcelist.container';
import { PlayerContainer } from './../Player/player.container';

export class Layout extends PureComponent {
  render() {
    return (
      <div className="container">
        <div className="fixed">
          <SourceListContainer />
        </div>
        <div className="flex-item">
          <PlayerContainer />
        </div>
      </div>
    );
  }
}

/*
const mapStateToProps = (state, ownProps) => {
  return {
  }
}
*/

// export const LayoutContainer = connect(mapStateToProps, LayoutActions)(Layout);
export const LayoutContainer = connect(null, null)(Layout);
