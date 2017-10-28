import Sound from 'react-sound';

class TogglePlay {
  execute(state) {
    if (state.get('queue').size > 0) {
      if (state.getIn(['playback', 'playStatus']) === Sound.status.PLAYING) {
        return state.setIn(['playback', 'playStatus'], Sound.status.PAUSED);
      }
      return state.setIn(['playback', 'playStatus'], Sound.status.PLAYING);
    }

    return state;
  }
}

export default new TogglePlay();
