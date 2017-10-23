import Sound from 'react-sound';

class Stop {
  execute(state) {
    return state.setIn(['playback', 'playStatus'], Sound.status.STOPPED);
  }
}

export default new Stop();
