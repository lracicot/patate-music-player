import React, { Component } from 'react';
import { List as UIList } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

// redux
import { connect } from 'react-redux';


import * as SourceListActions from './sourcelist.actions';

// Custom components
import Source from './components/source.component';

export class SourceList extends Component {
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
  sources: PropTypes.instanceOf(List).isRequired,
  connectSource: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sources: state.get('sources'),
});

export const SourceListContainer = connect(mapStateToProps, SourceListActions)(SourceList);
