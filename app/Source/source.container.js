import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import * as SourceActions from './source.actions';

// Custom components
// import Details from './components/details.component';

export class Source extends Component {
  render() {
    return (
      <div className="source_list">
        Ici je vais placer une liste avec SoundCloud, Deezer, etc.
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
export const SourceContainer = connect(null, SourceActions)(Source);
