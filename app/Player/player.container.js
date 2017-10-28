import React, { Component } from 'react';

// Sound component
import Sound from 'react-sound';

// redux
import { connect } from 'react-redux';
// import * as AppActions from '../App/app.actions';
import * as PlayerActions from './player.actions';

// Custom components
import Details from './components/details.component';
import Controls from './components/controls.component';
import Progress from './components/progress.component';
import Search from './components/search.component';
import Footer from './components/footer.component';

// Utils
import { formatMilliseconds } from '../utils/time';

export class Player extends Component {

  getPlayStatus() {
    return this.props.playStatus || 'STOPPED';
  }

  getPlayFromPosition() {
    return this.props.playFromPosition || 0;
  }

  getTrackTitle() {
    return this.props.track ? this.props.track.title || 'untitled' : 'no track';
  }

  getStreamUrl() {
    return this.props.track ? this.props.track.streamUrl : '';
    // return 'https://api.deezer.com/track/17608152'
  }

  xlArtwork(url) {
    if (url) {
      return url.replace(/large/, 't500x500');
    }
  }

  handleSongPlaying(audio) {
    this.props.playing({
      elapsed: formatMilliseconds(audio.position),
      total: formatMilliseconds(audio.duration),
      position: audio.position / audio.duration
    });
   }

  handleSongFinished() {
    this.next();
  }

  render() {
    let patateStyle = {
      width: '500px',
      height: '500px',
    };

    if (this.props.track) {
      patateStyle.backgroundImage = `linear-gradient(
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.7)
      ),
      url(${this.xlArtwork(this.props.track.artworkUrl)})`;
    }

    return (
      <div className="patate_music" style={patateStyle}>
        <Details title={ this.getTrackTitle() }/>
        <Sound
          url={ this.getStreamUrl() }
          playStatus={ this.getPlayStatus() }
          onPlaying={ this.handleSongPlaying.bind(this) }
          playFromPosition={ this.getPlayFromPosition() }
          onFinishedPlaying={ this.handleSongFinished.bind(this) }/>
        { this.getPlayStatus() }
        <Controls
          togglePlay={ this.props.toggleplay }
          stop={ this.props.stop }
          playStatus={ this.getPlayStatus() }
          next={ this.props.next }
          backward={ this.props.prev }/>
        <Progress
          elapsed={ this.props.elapsed }
          total={ this.props.total }
          position={ this.props.position }/>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  track: state.get('queue').get(0),
  playStatus: state.getIn(['playback', 'playStatus']),
  playFromPosition: state.getIn(['playback', 'playFromPosition'], 0),
  elapsed: state.getIn(['playback', 'elapsed']),
  total: state.getIn(['playback', 'total']),
  position: state.getIn(['playback', 'position']),
});


export const PlayerContainer = connect(mapStateToProps, PlayerActions)(Player);


// <Search
//   clientId={this.state.client_id}
//   autoCompleteValue={this.state.autoCompleteValue}
//   tracks={this.state.tracks}
//   handleSelect={this.handleSelect.bind(this)}
//   handleChange={this.handleChange.bind(this)}/>*/

/*
export class Player extends Component {

  handleSelect(value, item){
    this.setState({ autoCompleteValue: value, track: item });
  }
}*/
