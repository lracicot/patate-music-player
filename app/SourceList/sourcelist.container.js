import React, { Component } from 'react';
import { List as UIList } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { connect } from 'react-redux';

import { enqueue } from '.././Player/player.actions';
import * as SourceListActions from './sourcelist.actions';

// Custom components
import Source from './components/source.component';

export class SourceList extends Component {
  componentDidMount() {
    this.loadPlaylists();
  }

  componentDidUpdate() {
    this.loadPlaylists();
  }

  loadPlaylists() {
    const { props } = this;
    props.sources.map(source => source.loadRandomPlaylist().then((tracks) => {
      props.enqueue(List(tracks));
    }));
  }

  render() {
    const mapSourceToComponent = source => (
      <Source
        proxy={source}
        key={source.name}
        connectSource={this.props.connectSource}
      />
    );
    const listSources = this.props.sources.map(mapSourceToComponent);
    return (
      <UIList divided verticalAlign="middle">
        {listSources}
      </UIList>
    );
  }
}

SourceList.propTypes = {
  sources: PropTypes.instanceOf(List), // .isRequired
  connectSource: PropTypes.func, // .isRequired
};

// Juste en attendant
SourceList.defaultProps = {
  sources: new List(),
  connectSource: () => {},
};

const mapStateToProps = state => ({
  sources: state.get('sources'),
});

const mapDispatchToProps = dispatch => ({
  enqueue: tracks => dispatch(enqueue(tracks)),
});

export const SourceListContainer = connect(
  mapStateToProps,
  SourceListActions,
  mapDispatchToProps,
)(SourceList);
