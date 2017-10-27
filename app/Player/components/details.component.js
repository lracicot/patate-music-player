import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


class Details extends PureComponent {
  // Render
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
