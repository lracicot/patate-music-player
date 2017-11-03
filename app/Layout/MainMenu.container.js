import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  onResultSelect(target, prop) {
    const song = this.props.searchResults.find(e => prop.result.title === e.title);

    this.props.clearQueue();
    this.props.enqueue(song);
    this.props.endSearch();
    this.props.play();
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
  play: PropTypes.func.isRequired,
  enqueue: PropTypes.func.isRequired,
  searchResults: PropTypes.instanceOf(List),
  endSearch: PropTypes.func.isRequired,
  appendSearchResults: PropTypes.func.isRequired,
  clearSearchResults: PropTypes.func.isRequired,
  clearQueue: PropTypes.func.isRequired,
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

export const MainMenuContainer = connect(
  mapStateToProps,
  Object.assign(
    LayoutActions,
    PlayerActions,
  ),
)(MainMenu);
