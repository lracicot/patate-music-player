import React, { Component } from 'react';
import { List as UIList } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List } from 'immutable';

import * as SourceListActions from './sourcelist.actions';

// Custom components
import Source from './components/source.component';

/**
  * SourceList - A component which show the list of sources and
  * handle the connexion.
  * @extends Component
  */
export class SourceList extends Component {
  /**
   * render - Render the component
   *
   * @return {ReactComponent} Return the rendered component
   */
  render() {
    const mapSourceToComponent = source => (
      <Source
        proxy={source}
        key={source.name}
        dispatch={this.props.dispatch}
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
  sources: PropTypes.instanceOf(List).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sources: state.get('sources'),
});

const mapDispatchToProps = (dispatch) => {
  const customActions = {
    dispatch,
  };
  return Object.assign(customActions, bindActionCreators(SourceListActions, dispatch));
};

export const SourceListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SourceList);
