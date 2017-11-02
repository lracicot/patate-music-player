import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Menu from './components/mainMenu.component';
import * as LayoutActions from './layout.actions';
import * as PlayerActions from '../Player/player.actions';

@autobind
export class MainMenu extends Component {
  componentDidUpdate() {
    if (this.props.searchResults.size === 0) {
      this.loadSearchResults(this.props.searchQuery);
    }
  }

  onResultSelect(target, prop, value) {
    this.props.clearQueue();
    this.props.endSearch();
  }

  onSearchChange(target, prop) {
    this.props.clearSearchResults();
    this.props.search(prop.value);
  }

  loadSearchResults(keywords) {
    this.props.sources
      .filter(source => source.isConnected())
      .map(source => source.searchTracks(keywords).then((tracks) => {
        this.props.appendSearchResults(List(tracks));
      }));
  }

  render() {
    return (
      <Menu
        onResultSelect={this.onResultSelect}
        onSearchChange={this.onSearchChange}
        {...this.props}
      />
    );
  }
}

MainMenu.propTypes = {
  sources: PropTypes.instanceOf(List).isRequired,
  searchQuery: PropTypes.string,
  search: PropTypes.func.isRequired,
  searchResults: PropTypes.instanceOf(List),
  endSearch: PropTypes.func.isRequired,
  appendSearchResults: PropTypes.func.isRequired,
  clearSearchResults: PropTypes.func.isRequired,
};

MainMenu.defaultProps = {
  searchQuery: '',
  searchResults: List(),
};

const mapStateToProps = state => ({
  sources: state.get('sources'),
  searchQuery: state.get('searchQuery'),
  searchResults: state.get('searchResults'),
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ LayoutActions, PlayerActions }, dispatch),
});

export const MainMenuContainer = connect(mapStateToProps, mapDispatchToProps)(MainMenu);
