import React, { Component } from 'react';
import { Search, List as UIList } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { connect } from 'react-redux';

import * as PlaylistsListActions from './playlistslist.actions';

// Custom components
import PlaylistItem from './components/playlist.component';

export class PlaylistsList extends Component {
  handleSearchChange = (e, { value }) => {
    this.props.updateSearch(value);
  }

  render() {
    return (
      <div>
        <Search
          open={false}
          onSearchChange={this.handleSearchChange}
          value={this.props.currentSearch}
        />
        <UIList divided verticalAlign="middle">
          <PlaylistItem
            name="Foo"
          />
          <PlaylistItem
            name="Bar"
          />
        </UIList>
      </div>
    );
  }
}

PlaylistsList.propTypes = {
  currentSearch: PropTypes.string,
  updateSearch: PropTypes.func.isRequired,
};

PlaylistsList.defaultProps = {
  currentSearch: '',
};

const mapStateToProps = state => ({
  currentSearch: state.playlistSearch,
});

const mapDispatchToProps = (/* dispatch */) => {
  const customActions = {
  };
  return Object.assign(customActions, PlaylistsListActions);
};

export const PlaylistsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistsList);
