//React library
import React from 'react';

//Sound component
import Sound from 'react-sound';

//Flux dispatcher
import AppDispatcher from '../dispatcher/app.dispatcher';
import PlayerActions from './player.actions';

//Custom components
import Details from './components/details.component';
import Controls from './components/controls.component';
import Progress from './components/progress.component';
import Search from './components/search.component';
import Footer from './components/footer.component';
import Player from './player';

// Utils
import {formatMilliseconds} from '../utils/time';

class PlayerContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  update() {
    this.setState(Player.getState());
  }

  async componentDidMount() {
    this.state = await Player.getInitialState();
    Player.bind('change', this.update.bind(this));
  }

  componentWillUnmount() {
    Player.unbind('change', this.update);
 }

  prepareUrl(url) {
    //Attach client id to stream url
    return `${url}?client_id=${this.client_id}`
  }

  xlArtwork(url) {
    if (url)
    return url.replace(/large/, 't500x500');
  }

  togglePlay() {
    if (this.state.playStatus === Sound.status.PLAYING) {
      PlayerActions.pause();
    } else {
      PlayerActions.play();
    }
  }

  stop() {
    PlayerActions.stop();
  }

  next(){
    PlayerActions.next();
  }

  backward(){
    this.setState({playFromPosition: this.state.playFromPosition-=1000*10});
  }

  handleSelect(value, item){
    this.setState({ autoCompleteValue: value, track: item });
  }

  handleChange(event, value) {

  }

  toggleRandom() {

  }

  handleSongPlaying(audio) {
     this.setState({  elapsed: formatMilliseconds(audio.position),
                      total: formatMilliseconds(audio.duration),
                      position: audio.position / audio.duration })
   }

  handleSongFinished () {
    this.next();
   }

  render () {
    let patateStyle = {
      width: '500px',
      height: '500px',
    };

    if (this.state.track) {
      patateStyle.backgroundImage = `linear-gradient(
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.7)
      ),
      url(${this.xlArtwork(this.state.track.artwork_url)})`;
    }

    const title = this.state.track ? this.state.track.title : '';
    const stream_url = this.state.track ? this.state.track.stream_url : '';

    console.log(this.state);

    return (
      <div className="patate_music" style={patateStyle}>
        <Details
          title={title}/>
        <Sound
           url={this.prepareUrl(stream_url)}
           playStatus={this.state.playStatus}
           onPlaying={this.handleSongPlaying.bind(this)}
           playFromPosition={this.state.playFromPosition}
           onFinishedPlaying={this.handleSongFinished.bind(this)}/>
        <Controls
          togglePlay={this.togglePlay.bind(this)}
          stop={this.stop.bind(this)}
          playStatus={this.state.playStatus}
          next={this.next.bind(this)}
          backward={this.backward.bind(this)}
          random={this.toggleRandom.bind(this)}/>
        <Progress
          elapsed={this.state.elapsed}
          total={this.state.total}
          position={this.state.position}/>
        <Footer />
      </div>
    );
  }
}
/*
  <Search
    clientId={this.state.client_id}
    autoCompleteValue={this.state.autoCompleteValue}
    tracks={this.state.tracks}
    handleSelect={this.handleSelect.bind(this)}
    handleChange={this.handleChange.bind(this)}/>*/

export default PlayerContainer;
