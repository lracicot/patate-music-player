import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


/**
 * Details - Display the title
 * @extends PureComponent
 */
class Details extends PureComponent {
  /**
   * render - Render the component
   *
   * @return {ReactComponent} Return the rendered component
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
