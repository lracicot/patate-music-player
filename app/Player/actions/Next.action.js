import Sound from 'react-sound';

class Next {
  /**
   * Reduce the state
   */
  execute(state) {
    const currentTrack = state.get('queue').get(0);

    if (state.get('queue').size === 1) {
      return state.setIn(['playback', 'playStatus'], Sound.status.STOPPED);
    }

    return state.set(
      'queue',
      state.get('queue').shift(),
    ).set(
      'history',
      state.get('history').push(currentTrack),
    );
  }
}

export default new Next();
