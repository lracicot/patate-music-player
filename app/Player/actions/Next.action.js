import Sound from 'react-sound';

/**
 * Next - The action which next the music
 */
class Next {
  /**
   * execute - Execute the action
   *
   * @param {Map} state       The old state of the application
   *
   * @return {Map} The new state of the application
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
