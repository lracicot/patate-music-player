import React, { Component } from 'react';

// Import React's Autocomplete component
import Autocomplete from 'react-autocomplete';

/**
 * Search - The search component
 * @extends Component
 */
class Search extends Component {
  /**
   * handleRenderItem - Render the display items shown in the box
   *
   * @param {Song} item          The song to display
   * @param {type} isHighlighted Is highlighted
   *
   * @return {ReactComponent} Return the rendered component
   */
  handleRenderItem(item, isHighlighted) {
    // Some basic style
    const listStyles = {
      item: {
        padding: '2px 6px',
        cursor: 'default',
      },

      highlightedItem: {
        color: 'white',
        background: '#F38B72',
        padding: '2px 6px',
        cursor: 'default',
      },
    };

    // Render list items
    return (
      <div
        style={isHighlighted ? listStyles.highlightedItem : listStyles.item}
        key={item.id}
        id={item.id}
      >{item.title}
      </div>
    );
  }

  /**
   * render - Render the component
   *
   * @return {ReactComponent} Return the rendered component
   */
  render() {
    // Return JSX via render()
    return (
      <div className="search">
        <Autocomplete
          ref="autocomplete"
          inputProps={{ title: 'Title' }}
          value={this.props.autoCompleteValue}
          items={this.props.tracks}
          getItemValue={item => item.title}
          onSelect={this.props.handleSelect}
          onChange={this.props.handleChange}
          renderItem={this.handleRenderItem.bind(this)}
        />
      </div>
    );
  }
}

// Export Search
export default Search;
