import React, { PureComponent } from 'react';
import { Search } from 'semantic-ui-react';
import { List } from 'immutable';
import PropTypes from 'prop-types';


export default class MainMenu extends PureComponent {
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

MainMenu.propTypes = {
  searchResults: PropTypes.instanceOf(List),
  onResultSelect: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

MainMenu.defaultProps = {
  searchResults: List(),
};
