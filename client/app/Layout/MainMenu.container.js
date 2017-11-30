import React, { Component } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import Menu from './components/mainMenu.component';
import * as LayoutActions from './layout.actions';
import * as PlayerActions from '../Player/player.actions';

/**
  * MainMenu - The component for the side menu (this is a containing holding the menu)
  * @extends Component
  */
@autobind
export class MainMenu extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  /**
   * componentDidUpdate - Refresh on update
   */
  componentDidUpdate() {
    if (this.props.searchResults.size === 0) {
      this.loadSearchResults(this.props.searchQuery);
    }
  }

  /**
   * onResultSelect - On the selection of a result
   *
   * @param {object} target The targeted selection
   * @param {object} prop   The props
   */
  onResultSelect(target, prop) {
    const song = this.props.searchResults.find(e => prop.result.title === e.title);

    this.props.clearQueue();
    this.props.enqueue(song);
    this.props.endSearch();
    this.props.play();

    this.context.router.history.push('/');
  }

  /**
   * onSearchChange - On a change in the search
   *
   * @param {object} target The targeted selection
   * @param {object} prop   The props
   */
  onSearchChange(target, prop) {
    this.props.clearSearchResults();
    this.props.search(prop.value);
  }

  /**
   * loadSearchResults - Load search results
   *
   * @param {string} keywords search query
   */
  loadSearchResults(keywords) {
    this.props.sources
      .filter(source => source.isConnected())
      .map(source => source.searchTracks(keywords).then((tracks) => {
        this.props.appendSearchResults(List(tracks));
      }));
  }

  /**
   * render - Render the component
   *
   * @return {ReactComponent} Return the rendered component
   */
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
  accessToken: PropTypes.string.isRequired,
};

MainMenu.defaultProps = {
  searchQuery: '',
  searchResults: List(),
};

const mapStateToProps = state => ({
  accessToken: state.get('accessToken') ? state.get('accessToken') : '',
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
