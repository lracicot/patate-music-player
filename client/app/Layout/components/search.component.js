import React, { PureComponent } from 'react';
import { Search } from 'semantic-ui-react';
import { List } from 'immutable';
import PropTypes from 'prop-types';


/**
  * SearchComponent - The serach component
  * @extends PureComponent
  */
export default class SearchComponent extends PureComponent {
  /**
   * render - Render the component
   *
   * @return {ReactComponent} Return the rendered component
   */
  render() {
    const { searchResults } = this.props;
    const results = searchResults.map(song => ({
      title: song.title,
    })).toArray();

    return (
      <Search
        onResultSelect={this.props.onResultSelect}
        onSearchChange={this.props.onSearchChange}
        results={results}
      />
    );
  }
}

SearchComponent.propTypes = {
  searchResults: PropTypes.instanceOf(List),
  onResultSelect: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

SearchComponent.defaultProps = {
  searchResults: List(),
};
