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
    const { connectedSources } = this.props;
    const mapSourceToComponent = source => (
      <Source
        logo={source.logo}
        name={source.name}
        key={source.name}
        isConnected={!!connectedSources.find(s => s.name === source.name)}
        sourceId=""
        {...this.props}
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
  connectedSources: PropTypes.instanceOf(List).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sources: state.get('sources'),
  connectedSources: state.get('connectedSources'),
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
