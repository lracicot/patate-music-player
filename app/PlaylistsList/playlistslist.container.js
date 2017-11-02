import React, { Component } from 'react';
import { Search, List as UIList } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';

import * as PlaylistsListActions from './playlistslist.actions';

// Custom components
import PlaylistItem from './components/playlist.component';

export class PlaylistsList extends Component {
  handleSearchChange = (e, { value }) => {
    this.props.updateSearch(value);
  }

  render() {
    const mapPlaylistToComponent = playlist => (
      <PlaylistItem
        playlist={playlist}
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
        <UIList divided verticalAlign="middle">
          { listPlaylists }
        </UIList>
      </div>
    );
  }
}

PlaylistsList.propTypes = {
  currentSearch: PropTypes.string,
  updateSearch: PropTypes.func.isRequired,
  playlists: PropTypes.instanceOf(List).isRequired,
};

PlaylistsList.defaultProps = {
  currentSearch: '',
};

const mapStateToProps = state => ({
  currentSearch: state.get('playlistSearch'),
  playlists: state.get('playlistsFound'),
});

const mapDispatchToProps = (dispatch) => {
  const customActions = {
  };

  return Object.assign(customActions, bindActionCreators(PlaylistsListActions, dispatch));
};

export const PlaylistsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistsList);
