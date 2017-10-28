import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';


import * as SourceListActions from './sourcelist.actions';

// Custom components
import Source from './components/source.component';

export class SourceList extends Component {
  render() {
    return (
      <div className="source_list">
        <Source />
          <Source />
      </div>
    );
  }
}

/*
const mapStateToProps = state => ({
  track: state.get('queue').get(0),
  playStatus: state.getIn(['playback', 'playStatus']),
  playFromPosition: state.getIn(['playback', 'playFromPosition'], 0),
  elapsed: state.getIn(['playback', 'elapsed']),
  total: state.getIn(['playback', 'total']),
  position: state.getIn(['playback', 'position']),
});
*/

// export const SourceContainer = connect(mapStateToProps, SourceActions)(Source);
export const SourceListContainer = connect(null, SourceListActions)(SourceList);
