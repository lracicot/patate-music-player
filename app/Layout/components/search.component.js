import React, { PureComponent } from 'react';
import { Search } from 'semantic-ui-react';
import { List } from 'immutable';
import PropTypes from 'prop-types';


export default class MainMenu extends PureComponent {
  handleResultSelect = () => {};
  handleSearchChange = () => {};

  render() {
    const { searchResults } = this.props;

    return (
      <Search
        onResultSelect={this.props.onResultSelect}
        onSearchChange={this.props.onSearchChange}
        results={searchResults}
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
  searchResults: [],
};
