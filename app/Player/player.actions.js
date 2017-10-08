import AppDispatcher from '../dispatcher/app.dispatcher';
import PlayerConstants from './player.constants';

const PlayerActions = {
  play: function (data) {
    AppDispatcher.dispatch({
      type: PlayerConstants.PLAY
    });
  },
  
  pause: function (data) {
    AppDispatcher.dispatch({
      type: PlayerConstants.PAUSE,
    });
  },

  stop: function (data) {
    AppDispatcher.dispatch({
      type: PlayerConstants.STOP,
    });
  },

  next: function (data) {
    AppDispatcher.dispatch({
      type: PlayerConstants.NEXT,
    });
  },

  prev: function (data) {
    AppDispatcher.dispatch({
      type: PlayerConstants.PREV,
    });
  },

  setTrack: function(data) {
    AppDispatcher.dispatch({
      type: PlayerConstants.SET_TRACK,
      data: data,
    });
  },

  addTracks: function(data) {
    AppDispatcher.dispatch({
      type: PlayerConstants.ADD_TRACKS,
      data: data,
    });
  },
};

export default PlayerActions;
