import Sound from 'react-sound';

class Play {
  /**
   * Reduce the state
   */
  execute(state) {
    if (state.get('queue').size > 0) {
      return state.setIn(['playback', 'playStatus'], Sound.status.PLAYING);
    }

    return state;
  }
}

export default new Play();
