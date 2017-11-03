import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


class Details extends PureComponent {
  /**
   * Renders the component to DOM elements
   *
   * @return {object} JSX
   */
  render() {
    return (
      <div className="details">
        <h3>{this.props.title}</h3>
      </div>
    );
  }
}

Details.propTypes = {
  title: PropTypes.string.isRequired,
};

// Export
export default Details;
