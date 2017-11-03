import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import { SourceListContainer } from './../SourceList/sourcelist.container';
import { PlayerContainer } from './../Player/player.container';

export class Layout extends PureComponent {
  componentDidUpdate() {
    this.loadSearchResults();
  }

  /**
   * Renders the component to DOM elements
   *
   * @return {object} JSX
   */
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

Layout.propTypes = {
  sources: PropTypes.instanceOf(List).isRequired,
};

const mapStateToProps = state => ({
  sources: state.get('sources'),
  search: state.get('search'),
  searchResults: state.get('searchResults'),
});

export const LayoutContainer = connect(mapStateToProps)(Layout);
