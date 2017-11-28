import React, { Component } from 'react';

// Sound component
import Sound from 'react-sound';

import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import * as AppActions from '../App/app.actions';
import * as PlayerActions from './player.actions';

// Custom components
import Details from './components/details.component';
import Controls from './components/controls.component';
import Progress from './components/progress.component';
//  import Search from './components/search.component';
import Footer from './components/footer.component';

// Utils
import { formatMilliseconds } from '../utils/time';

/**
  * Player - A component who play the music
  * @extends Component
  */
@autobind
export class Player extends Component {
  /**
   * getPlayFromPosition - Get the position
   *
   * @return {number} the position
   */
  getPlayFromPosition() {
    return this.props.playFromPosition || 0;
  }

  /**
   * xlArtwork - Return the url for the artwork is there is one
   *
   * @param {string} url The url
   *
   * @return {string} The formatted url
   */
  xlArtwork(url) {
    if (url) {
      return url.replace(/large/, 't500x500');
    }
    return null;
  }

  /**
   * handleSongPlaying - Dispatch the playing action while song is playing
   *
   * @param {Sound} audio The sound to handle
   *
   */
  handleSongPlaying(audio) {
    this.props.playing({
      elapsed: formatMilliseconds(audio.position),
      total: formatMilliseconds(audio.duration),
      position: audio.position / audio.duration,
    });
  }

  /**
   * handleSongFinished - Dispatch the next action when song finish
   */
  handleSongFinished() {
    this.next();
  }

  /**
   * render - Render the component
   *
   * @return {ReactComponent} Return the rendered component
   */
  render() {
    const patateStyle = {
      width: '500px',
      height: '500px',
    };

    patateStyle.backgroundImage = `linear-gradient(
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url(${this.xlArtwork(this.props.trackArtworkUrl)})`;

    return (
      <div className="patate_music" style={patateStyle}>
        <Details title={this.props.trackTitle} />
        <Sound
          url={this.props.trackStreamUrl}
          playStatus={this.props.playStatus}
          onPlaying={this.handleSongPlaying}
          playFromPosition={this.getPlayFromPosition()}
          onFinishedPlaying={this.handleSongFinished}
        />
        { this.props.playStatus }
        <Controls
          togglePlay={this.props.toggleplay}
          stop={this.props.stop}
          playStatus={this.props.playStatus}
          next={this.props.next}
          backward={this.props.prev}
        />
        <Progress
          elapsed={this.props.elapsed}
          total={this.props.total}
          position={this.props.position}
        />
        <Footer />
      </div>
    );
  }
}

Player.propTypes = {
  toggleplay: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  playing: PropTypes.func.isRequired,
  elapsed: PropTypes.string,
  total: PropTypes.string,
  position: PropTypes.number,
  playStatus: PropTypes.string,
  playFromPosition: PropTypes.number.isRequired,
  trackTitle: PropTypes.string,
  trackStreamUrl: PropTypes.string,
  trackArtworkUrl: PropTypes.string,
};

Player.defaultProps = {
  trackArtworkUrl: '',
  trackTitle: 'no title',
  trackStreamUrl: '',
  playStatus: Sound.status.STOPPED,
  position: 0,
  elapsed: '',
  total: '',
};

const mapStateToProps = state => ({
  track: state.get('queue').get(0),
  trackArtworkUrl: state.get('queue').get(0) ? state.get('queue').get(0).artworkUrl : '',
  trackTitle: state.get('queue').get(0) ? state.get('queue').get(0).title : '',
  trackStreamUrl: state.get('queue').get(0) ? state.get('queue').get(0).streamUrl : '',
  playStatus: state.getIn(['playback', 'playStatus']),
  playFromPosition: state.getIn(['playback', 'playFromPosition'], 0),
  elapsed: state.getIn(['playback', 'elapsed']),
  total: state.getIn(['playback', 'total']),
  position: state.getIn(['playback', 'position']),
});

export const PlayerContainer = connect(mapStateToProps, PlayerActions)(Player);
