// Import React
import React from 'react';

// Create Progress component class
class Progress extends React.Component {

  // Render method
  render() {

    return(
      <div className="progress">
        {/* Elapsed time */}
        <span className="player__time-elapsed">{this.props.elapsed}</span>
        {/* Progress Bar */}
        <progress
           value={this.props.position}
           max="1"></progress>
         {/* Total time */}
         <span className="player__time-total">{this.props.total}</span>
      </div>
    )
  }

}

//Export Progress
export default Progress
