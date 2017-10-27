import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ClassNames from 'classnames';

class Controls extends PureComponent {
  render() {
    const playPauseClass = ClassNames({
      'fa fa-play': this.props.playStatus !== 'PLAYING',
      'fa fa-pause': this.props.playStatus === 'PLAYING',
    });

    return (
      <div className="player">
        <div className="player__backward">
          <button onClick={this.props.backward}><i className="fa fa-backward" /></button>
        </div>
        <div className="player__main">
          <button onClick={this.props.togglePlay}><i className={playPauseClass} /></button>
          <button onClick={this.props.stop}><i className="fa fa-stop" /></button>
        </div>
        <div className="player__forward">
          <button onClick={this.props.next}><i className="fa fa-step-forward" /></button>
        </div>
      </div>
    );
  }
}

Controls.propTypes = {
  playStatus: PropTypes.string.isRequired,
  backward: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

// Export Controls
export default Controls;
