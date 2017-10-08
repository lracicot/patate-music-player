import {ReduceStore} from 'flux/utils';
import ActionTypes from './player.constants';
import Dispatcher from '../dispatcher/app.dispatcher';
import MicroEvent from 'microevent';
import Sound from 'react-sound';

//Axios for Ajax
import Axios from 'axios';

class Player extends ReduceStore {
  tracks = [];
  history = [];
  client_id = '';

  constructor() {
    super(Dispatcher);
  }

  async loadPlaylist() {
    try {
      const response = await Axios.get(`https://api.soundcloud.com/tracks?client_id=${this.client_id}`);
      //PlayerActions.addTracks(response.data);
      this.tracks = response.data;
    } catch (e) {
      console.log(e);
    }
  }

  getState() {
    return this._state;
  }

  async getInitialState() {
    this.client_id = '2f98992c40b8edf17423d93bda2e04ab';
    await this.loadPlaylist();
    return {
      track: this.tracks[0],//{stream_url: '', title: '', artwork_url: ''},
      playStatus: Sound.status.STOPPED,
      elapsed: '00:00',
      total: '00:00',
      position: 0,
      playFromPosition: 0,
      autoCompleteValue: '',
      random: false,
      playlistIndex: 0,
    }
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.PLAY:
        state.playStatus = Sound.status.PLAYING;
        this.trigger('change');
        return state;

      case ActionTypes.PAUSE:
        state.playStatus = Sound.status.PAUSED;
        this.trigger('change');
        return state;

      case ActionTypes.STOP:
        state.playStatus = Sound.status.STOPPED;
        this.trigger('change');
        return state;

      case ActionTypes.NEXT:
        if (state.random) {
          const trackLength = this.tracks.length;
          const randomNumber = Math.floor((Math.random() * trackLength) + 1);

          state.track = this.tracks[randomNumber];
        } else {
          this.history.push(state.track);
          state.track = this.tracks[++state.playlistIndex];
        }
        this.trigger('change');
        return state;

      case ActionTypes.SET_TRACK:
        if (state.track)
        this.history.push(state.track);
        state.track = action.data;
        this.trigger('change');
        return state;

      case ActionTypes.ADD_TRACKS:
        this.tracks = action.data;
        this.trigger('change');
        return state;

      default:
        return state;
    }
  }
}

MicroEvent.mixin(Player);

export default new Player();
