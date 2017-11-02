import React, { Component } from 'react';
import { Search, List as UIList } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { autobind } from 'core-decorators';

import * as PlaylistsListActions from './playlistslist.actions';

// Custom components
import PlaylistItem from './components/playlist.component';

@autobind
export class PlaylistsList extends Component {
  handleSearchChange = (e, { value }) => {
    this.props.dispatch(PlaylistsListActions.updateSearch(this.props.sources, value));
  }

  render() {
    const mapPlaylistToComponent = playlist => (
      <PlaylistItem
        key={playlist.uri}
        playlist={playlist}
        onClick={this.handleOnItemClick}
        dispatch={this.props.dispatch}
      />
    );
    const listPlaylists = this.props.playlists.map(mapPlaylistToComponent);
    return (
      <div>
        <Search
          open={false}
          onSearchChange={this.handleSearchChange}
          value={this.props.currentSearch}
        />
        <UIList
          divided
          verticalAlign="middle"
        >
          { listPlaylists }
        </UIList>
      </div>
    );
  }
}

PlaylistsList.propTypes = {
  currentSearch: PropTypes.string,
  playlists: PropTypes.instanceOf(List).isRequired,
  sources: PropTypes.instanceOf(List).isRequired,
  dispatch: PropTypes.func.isRequired,
};

PlaylistsList.defaultProps = {
  currentSearch: '',
};

const mapStateToProps = state => ({
  currentSearch: state.get('playlistSearch'),
  playlists: state.get('playlistsFound'),
  sources: state.get('sources'),
});

const mapDispatchToProps = (dispatch) => {
  const customActions = {
    dispatch,
  };

  return Object.assign(customActions, bindActionCreators(PlaylistsListActions, dispatch));
};

export const PlaylistsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistsList);
